import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Link,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { REGISTER } from "../services/user";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/carList", { replace: true });
    }
  }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("All fields are required!");
      return;
    }

    try {
      // Make the API call for registration
      const res = await axios.post(REGISTER, {
        name,
        email,
        password,
      });

      // Success response
      if (res.status === 201) {
        toast.success("Signup successful!");
        navigate("/");
        // Redirect user or clear form as needed
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status code other than 2xx
        const { status, data } = error.response;
        console.log(error.response.data);
        if (status === 401) {
          toast.error(
            "Invalid credentials. Please check your email or password."
          );
        } else if (status === 500) {
          toast.error(data);
        } else {
          toast.error(data.error || data.message);
        }
      } else if (error.request) {
        // No response was received
        toast.error("Network error. Please check your connection.");
      } else {
        // Something went wrong while setting up the request
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      <Grid container sx={{ height: "100vh" }}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
              Sign Up
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                sx={{ mb: 3 }}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                sx={{ mb: 3 }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                sx={{ mb: 3 }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mb: 2 }}
              >
                Sign Up
              </Button>
              <Typography variant="body2" sx={{ textAlign: "center" }}>
                Already have an account?{" "}
                <Link
                  component="button"
                  onClick={() => navigate("/")}
                  underline="none"
                  sx={{ color: "#1976d2", fontWeight: "bold" }}
                >
                  Login here
                </Link>
              </Typography>
            </form>
          </Container>
        </Grid>
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
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
            Join Car Management
          </Typography>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Start managing your cars effortlessly. Sign up today to enjoy all
            the features.
          </Typography>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default SignupPage;
