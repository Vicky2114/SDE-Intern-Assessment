import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Box,
  Link,
} from "@mui/material";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { LOGIN } from "../services/user";
import CircularProgress from '@mui/material/CircularProgress'; // For loading indicator

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state
  const navigate = useNavigate();
  useEffect(() => {
   
    if (localStorage.getItem('token')) {
      navigate('/carList', { replace: true });
    }
  }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true); // Set loading to true before making the request

    try {
      const res = await axios.post(LOGIN, { email, password });

      if (res.status === 200 || res.status === 201) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);
        toast.success("Login successful!");
        navigate("/carList"); // Example redirect
      } else {
        toast.error("Login unsuccessful. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        console.log(error.response.data);
        if (status === 401) {
          toast.error("Invalid credentials. Please check your email or password.");
        } else if (status === 500) {
          toast.error("Server error. Please try again later.");
        } else {
          toast.error(data.error || "An error occurred. Please try again.");
        }
      } else if (error.request) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false); 
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
    >
      <Grid container sx={{ height: "100vh" }}>
        {/* Left Panel */}
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
            Car Management
          </Typography>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Manage your car listings efficiently. Add, edit, and view your cars
            with ease.
          </Typography>
        </Grid>

        {/* Right Panel */}
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
              Login
            </Typography>
            <form onSubmit={handleSubmit}>
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
                type="password"
                variant="outlined"
                sx={{ mb: 3 }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mb: 2 }}
                disabled={loading} 
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "Login"
                )}
              </Button>
              <Typography variant="body2" sx={{ textAlign: "center" }}>
                Don't have an account?{" "}
                <Link
                  component="button"
                  onClick={() => navigate("/signup")}
                  underline="none"
                  sx={{ color: "#1976d2", fontWeight: "bold" }}
                >
                  Create new one
                </Link>
              </Typography>
            </form>
          </Container>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default LoginPage;
