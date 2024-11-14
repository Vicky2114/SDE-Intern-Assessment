import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Container,
  Paper,
  Box,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import axios from "axios"; // Import axios
import { GETPRODUCTBYID, UPDATEPRODUCTBYID } from "../services/api"; // Define the endpoint for update
import { useParams } from "react-router-dom";

const EditProductPage = () => {
  const { id: productId } = useParams();
  const [carData, setCarData] = useState({
    title: "",
    description: "",
    tags: "",
    images: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const token = localStorage.getItem("token");
  useEffect(() => {
   
    const fetchProductData = async () => {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      try {
        const response = await axios.get(GETPRODUCTBYID(productId), {
          headers: headers,
        });
        setCarData({
          title: response.data.product.title,
          description: response.data.product.description,
          tags: response.data.product.tags,
          images: [], 
        });
      } catch (error) {
        console.error("Error fetching product data", error);
        toast.error("Failed to load product data.");
      }
    };

    fetchProductData();
  }, [productId]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: true,
    onDrop: (acceptedFiles) => {
      setCarData((prevData) => ({
        ...prevData,
        images: [...prevData.images, ...acceptedFiles],
      }));
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!carData.title || !carData.description || !carData.tags) {
      toast.error("All fields are required!");
      return;
    }

   
    const payload = {
      title: carData.title,
      description: carData.description,
      tags: carData.tags,
    };

    try {
      setIsSubmitting(true); 

      
      const response = await axios.put(UPDATEPRODUCTBYID(productId), payload, {
        headers: {
          "Content-Type": "application/json", 
          Authorization: `Bearer ${token}`,
        },
      });

      // Handle the response
      if (response.status === 200) {
        toast.success("Product updated successfully!");
        // Reset form or redirect
      } else {
        toast.error("Failed to update product.");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const { message, errors } = error.response.data;

        
        if (message === "Validation Error" && errors?.length > 0) {
          errors.forEach((err) => toast.error(err)); 
        } else {
          toast.error(
            message || "An error occurred while updating the product."
          );
        }
      } else {
        toast.error("Network error or server is down.");
      }
      console.error("Error submitting the form:", error);
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.6 }}
    >
      <Grid container sx={{ height: "100vh", padding: 2 }}>
        {/* Left Panel with Animation */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            backgroundColor: "#1976d2",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 4,
            borderRadius: 2,
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
            Car Management
          </Typography>
          <Typography
            variant="h6"
            sx={{ textAlign: "center", lineHeight: 1.5, fontWeight: 300 }}
          >
            Edit your car listing details below.
          </Typography>
        </Grid>

        {/* Right Panel with Form */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 4,
          }}
        >
          <Paper
            sx={{
              p: 4,
              borderRadius: 2,
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
              width: "100%",
              maxWidth: 500,
            }}
          >
            <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
              Edit Car Information
            </Typography>

            <TextField
              fullWidth
              label="Car Title"
              name="title"
              value={carData.title}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
              variant="outlined"
              disabled={isSubmitting} // Disable input when submitting
            />

            <TextField
              fullWidth
              label="Description"
              name="description"
              value={carData.description}
              onChange={handleInputChange}
              multiline
              rows={4}
              sx={{ mb: 2 }}
              variant="outlined"
              disabled={isSubmitting} // Disable input when submitting
            />

            <TextField
              fullWidth
              label="Tags (comma separated)"
              name="tags"
              value={carData.tags}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
              variant="outlined"
              disabled={isSubmitting} // Disable input when submitting
            />

            {/* Submit Button */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              fullWidth
              sx={{
                padding: "10px",
                fontWeight: "bold",
                marginTop: "10px",
                boxShadow: "0 5px 15px rgba(0, 123, 255, 0.2)",
                "&:hover": {
                  backgroundColor: "#115293",
                },
              }}
              disabled={isSubmitting} // Disable button when submitting
            >
              {isSubmitting ? "Submitting..." : "Update"}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default EditProductPage;
