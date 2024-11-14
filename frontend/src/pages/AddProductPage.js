import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Container,
  Paper,
  Box,
} from "@mui/material";
import { useDropzone } from "react-dropzone"; // For image upload
import { CSSTransition } from "react-transition-group"; // For animations
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import axios from "axios"; // Import axios
import { CREATE } from "../services/api";

const AddProductPage = () => {
  const [carData, setCarData] = useState({
    title: "",
    description: "",
    tags: "",
    images: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state

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

    // Create FormData to append the car data and images
    const formData = new FormData();
    formData.append("title", carData.title);
    formData.append("description", carData.description);
    formData.append("tags", carData.tags);

    // Append all selected images
    carData.images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      setIsSubmitting(true); // Set loading state to true when starting the request

      // Make the POST request with axios
      const response = await axios.post(CREATE, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set header for file upload
          Authorization: `Bearer ${token}`,
        },
      });

      // Handle the response
      if (response.status === 201) {
        toast.success("Product added successfully!");
        // Reset form after successful submission
        setCarData({
          title: "",
          description: "",
          tags: "",
          images: [],
        });
      } else {
        toast.error("Failed to add product.");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const { message, errors } = error.response.data;

        // Display validation errors if present
        if (message === "Validation Error" && errors?.length > 0) {
          errors.forEach((err) => toast.error(err)); // Show each validation error as a toast
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
      setIsSubmitting(false); // Set loading state to false after the request completes
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
            sx={{
              textAlign: "center",
              lineHeight: 1.5,
              fontWeight: 300,
            }}
          >
            Manage your car listings efficiently. Add, edit, and view your cars
            with ease.
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
              Add Car Information
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

            {/* Image Upload */}
            <Box
              {...getRootProps()}
              sx={{
                border: "2px dashed #ccc",
                padding: 2,
                borderRadius: 2,
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  borderColor: "#1976d2",
                  backgroundColor: "#f1f1f1",
                },
              }}
            >
              <input {...getInputProps()} disabled={isSubmitting} />
              <Typography variant="body1" color="text.secondary">
                Drag & drop images here, or click to select files
              </Typography>
            </Box>

            {/* Show selected images */}
            {carData.images.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: "bold", mb: 1 }}>
                  Selected Images:
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                  {carData.images.map((image, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        maxWidth: 100,
                        overflow: "hidden",
                        borderRadius: 1,
                        border: "1px solid #ccc",
                        p: 1,
                      }}
                    >
                      <img
                        src={URL.createObjectURL(image)} // Create a URL for the image
                        alt={image.name}
                        style={{
                          width: "50%",
                          height: "auto",
                          objectFit: "cover",
                          borderRadius: 4,
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          maxWidth: "100px",
                          textAlign: "center",
                          mt: 1,
                        }}
                      >
                        {image.name}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

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
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default AddProductPage;
