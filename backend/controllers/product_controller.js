const Car = require("../models/carModel");
const cloudinary = require("../config/cloudinary"); // Cloudinary config
const upload = require("../config/multer"); // Multer config

// Create a new car product
const createCar = async (req, res) => {
  console.log(req.user);
  try {
    const { title, description, tags } = req.body;

    // Check if files are provided
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one image is required" });
    }

    const imageUrls = req.files.map((file) => file.path);

    // Create a new car entry
    const car = new Car({
      userId: req.user.id, // User ID from JWT token
      title,
      description,
      tags,
      images: imageUrls, // Store Cloudinary URLs
    });

    // Save the car entry
    await car.save();
    res.status(201).json({ message: "Car created successfully", car });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error creating car", error: error.message });
  }
};

const listProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; 
    const userId = req.user.id;


    const parsedPage = Math.max(1, parseInt(page, 10));
    const parsedLimit = Math.max(1, parseInt(limit, 10));

    // Fetch the paginated results and total document count
    const products = await Car.find({ userId })
      .skip((parsedPage - 1) * parsedLimit)
      .limit(parsedLimit);

    const totalDocs = await Car.countDocuments({ userId });

    res.status(200).json({
      products,
      pagination: {
        page: parsedPage,
        limit: parsedLimit,
        totalDocs,
        totalPages: Math.ceil(totalDocs / parsedLimit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
};


const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Car.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: "Error fetching the product" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { title, description, tags } = req.body;

    // Find the product by ID and update it
    const product = await Car.findByIdAndUpdate(
      productId,
      { title, description, tags },
      { new: true } // Return the updated product
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating the product", error: error.message });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    // Delete the product by ID
    const product = await Car.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting the product", error: error.message });
  }
};
module.exports = {
  createCar,
  listProducts,
  getProductById,
  deleteProduct,
  updateProduct,
};
