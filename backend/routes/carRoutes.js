const express = require("express");
const { product_controller } = require("../controllers"); // Import the createCar controller
const { upload, errorHandler } = require("../config/multer"); // Multer upload configuration

const {
  productValidationMiddleware,
  authMiddleware,
} = require("../middleware"); // JWT Auth Middleware

const router = express.Router();

/**
 * @swagger
 * /product/createProduct:
 *   post:
 *     summary: Create a new car product
 *     description: Create a car product with up to 10 images, title, description, and tags. Requires JWT authentication.
 *     tags:
 *       - Product
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Tesla Model S"
 *               description:
 *                 type: string
 *                 example: "A high-performance electric vehicle with autopilot capabilities."
 *               tags:
 *                 type: string
 *                 example: "electric, luxury, Tesla, autopilot"
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: "Upload images of the car. Maximum of 10 images."
 *                 maxItems: 10
 *             required:
 *               - title
 *               - description
 *               - tags
 *               - images
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product created successfully"
 *                 product:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: "Tesla Model S"
 *                     description:
 *                       type: string
 *                       example: "A high-performance electric vehicle with autopilot capabilities."
 *                     tags:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["electric", "luxury", "Tesla", "autopilot"]
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/car_images/tesla_model_s_1.jpg"
 *                       description: "URLs of uploaded images"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-13T10:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-13T10:00:00Z"
 *                     _id:
 *                       type: string
 *                       example: "product_id_here"
 *       400:
 *         description: Bad request, missing required fields or invalid file uploads
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "At least one image is required"
 *       401:
 *         description: Unauthorized, missing or invalid JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error, please try again"
 */

router.post(
  "/createProduct",
  authMiddleware.authenticateToken,
  upload.array("images", 10),
  productValidationMiddleware.validateProduct,
  product_controller.createCar,
  errorHandler
);

/**
 * @swagger
 * /product/list:
 *   get:
 *     summary: List all products
 *     description: Retrieve all car products in the database with pagination support.
 *     tags:
 *       - Product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The page number to retrieve (default is 1).
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: The number of products to retrieve per page (default is 10).
 *     responses:
 *       200:
 *         description: List of products with pagination info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "product_id_here"
 *                       title:
 *                         type: string
 *                         example: "Tesla Model S"
 *                       description:
 *                         type: string
 *                         example: "A high-performance electric vehicle with autopilot capabilities."
 *                       tags:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["electric", "luxury", "Tesla", "autopilot"]
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     totalDocs:
 *                       type: integer
 *                       example: 100
 *                     totalPages:
 *                       type: integer
 *                       example: 10
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error fetching products"
 */
router.get(
  "/list",
  authMiddleware.authenticateToken,
  product_controller.listProducts
); // List all products

/**
 * @swagger
 * /product/{productId}:
 *   get:
 *     summary: Get a particular product by ID
 *     description: Retrieve a single car product by its ID.
 *     tags:
 *       - Product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: The ID of the product to retrieve
 *         schema:
 *           type: string
 *           example: "product_id_here"
 *     responses:
 *       200:
 *         description: Product found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "product_id_here"
 *                     title:
 *                       type: string
 *                       example: "Tesla Model S"
 *                     description:
 *                       type: string
 *                       example: "A high-performance electric vehicle with autopilot capabilities."
 *                     tags:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["electric", "luxury", "Tesla", "autopilot"]
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product not found"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error fetching the product"
 */
router.get(
  "/:productId",
  authMiddleware.authenticateToken,
  product_controller.getProductById
); // Get a particular product by ID

/**
 * @swagger
 * /product/{productId}:
 *   put:
 *     summary: Update a product by ID
 *     description: Update a particular product's details.
 *     tags:
 *       - Product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: The ID of the product to update
 *         schema:
 *           type: string
 *           example: "product_id_here"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Tesla Model S"
 *               description:
 *                 type: string
 *                 example: "Updated description of the electric vehicle."
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["electric", "luxury", "Tesla", "updated"]
 *     responses:
 *       200:
 *         description: Product updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product updated successfully"
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error updating the product"
 */
router.put(
  "/:productId",
  productValidationMiddleware.validateProduct,
  authMiddleware.authenticateToken,
  product_controller.updateProduct
); // Update product by ID

/**
 * @swagger
 * /product/{productId}:
 *   delete:
 *     summary: Delete a product by ID
 *     description: Delete a particular product from the database.
 *     tags:
 *       - Product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: The ID of the product to delete
 *         schema:
 *           type: string
 *           example: "product_id_here"
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product deleted successfully"
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error deleting the product"
 */
router.delete(
  "/:productId",
  authMiddleware.authenticateToken,
  product_controller.deleteProduct
); // Delete product by ID

module.exports = router;
