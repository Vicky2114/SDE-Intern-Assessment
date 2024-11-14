import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Chip,
  IconButton,
  CircularProgress,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { ArrowBack, Edit, Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";
import axios from "axios";
import { DELETEPRODUCTBYID, GETPRODUCTBYID } from "../services/api";

const CarDetailPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const token = localStorage.getItem("token");
  const history = useNavigate();
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };
  useEffect(() => {
    const fetchCarDetails = async () => {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      try {
        const response = await axios.get(GETPRODUCTBYID(id), {
          headers: headers,
        });
        setCar(response.data.product);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch car details");
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  const handleEdit = () => {
    // Navigate to the Edit page
    history(`/edit-car/${id}`);
  };

  const handleDelete = async () => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    try {
      await axios.delete(DELETEPRODUCTBYID(id), { headers });
      setOpenDialog(false);

      history("/carList");
    } catch (err) {
      alert("Failed to delete the car");
    }
  };

  if (loading) {
    return (
      <CircularProgress
        sx={{ display: "block", margin: "auto", marginTop: 5 }}
      />
    );
  }

  if (error) {
    return (
      <Typography variant="h5" color="error" sx={{ textAlign: "center" }}>
        {error}
      </Typography>
    );
  }

  if (!car) {
    return (
      <Typography variant="h5" sx={{ textAlign: "center" }}>
        Car not found
      </Typography>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          position: "relative",
          height: "600px",
          backgroundImage: `url(${car.images[0]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: 2,
          boxShadow: 4,
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(10px)",
            zIndex: -1,
          },
        }}
      >
        <Link to="/carList" style={{ textDecoration: "none" }}>
          <Button
            startIcon={<ArrowBack />}
            variant="outlined"
            color="primary"
            sx={{ margin: 3 }}
          >
            Back to Cars List
          </Button>
        </Link>
        <Box
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            display: "flex",
            gap: 2,
          }}
        >
          <IconButton
            onClick={handleEdit}
            color="primary"
            sx={{
              backgroundColor: "white",
              borderRadius: "50%",
              padding: 1,
              boxShadow: 2,
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
            }}
          >
            <Edit />
          </IconButton>
          <IconButton
            onClick={handleDialogOpen}
            color="error"
            sx={{
              backgroundColor: "white",
              borderRadius: "50%",
              padding: 1,
              boxShadow: 2,
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
            }}
          >
            <Delete />
          </IconButton>
        </Box>
      </Box>

      <div style={{ margin: "10px" }}>
        <Typography variant="h4" component="div" gutterBottom>
          {car.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {car.description}
        </Typography>

        {/* Tags - Car Type, Company, Dealer */}
        <Box sx={{ marginBottom: 2 }}>
          {car.tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              variant="outlined"
              sx={{
                mr: 1,
                mb: 1,
                backgroundColor: "#f4f4f4",
                borderColor: "#ddd",
                color: "#333",
                fontWeight: 600,
              }}
            />
          ))}
        </Box>

        <Divider sx={{ marginBottom: 2 }} />

        <Typography variant="h6" color="text.primary" gutterBottom>
          Additional Images
        </Typography>

        <Box
          sx={{
            display: "flex",
            overflowX: "auto",
            gap: 2,
            paddingBottom: 2,
          }}
        >
          {car.images.slice(1).map((image, index) => (
            <CardMedia
              key={index}
              component="img"
              alt={`Car image ${index + 1}`}
              image={image}
              sx={{
                width: "300px",
                height: "auto",
                borderRadius: 2,
                boxShadow: 2,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            />
          ))}
        </Box>
      </div>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this car?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CarDetailPage;
