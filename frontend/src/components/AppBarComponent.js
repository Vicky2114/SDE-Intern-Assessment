// AppBarComponent.js
import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AppBarComponent = ({ userName, handleAddProduct }) => {
  const navigate = useNavigate();

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Car Management
        </Typography>
        <Typography variant="h6" sx={{ marginRight: 2 }}>
          Welcome, {userName}
        </Typography>
        <Button color="inherit" onClick={handleAddProduct}>
          Add Product
        </Button>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
