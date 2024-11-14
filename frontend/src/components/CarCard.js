import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

const CarCard = ({ car }) => {
  return (
    <Link to={`/carDetails/${car._id}`} style={{ textDecoration: "none" }}>
      {" "}
      <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
        <CardMedia
          component="img"
          alt="Car image"
          height="200"
          image={car?.images[0]}
        />

        <CardContent>
          <Typography variant="h6" component="div" gutterBottom>
            {car.title}
          </Typography>

          <Typography variant="body2" color="text.secondary" paragraph>
            {`${car?.description.slice(0, 100)}${
              car?.description.length > 100 ? "..." : ""
            }`}
          </Typography>

          <Box>
            {car.tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                variant="outlined"
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CarCard;
