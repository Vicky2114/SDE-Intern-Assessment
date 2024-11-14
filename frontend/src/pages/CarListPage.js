import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Box,
  Pagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CarCard from "../components/CarCard";
import AppBarComponent from "../components/AppBarComponent";
import { GETLIST } from "../services/api";
import axios from "axios";

const CarListPage = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;

  const history = useNavigate();
  const token = localStorage.getItem("token");

  const userData = JSON.parse(localStorage.getItem("user"));
  const userName = userData ? userData.name : "Guest";

  const fetchData = async (page = 1, limit = itemsPerPage) => {
    try {
      setLoading(true);
      setError(null);

      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.get(GETLIST, {
        headers,
        params: { page, limit },
      });

      const data = response.data.products || [];
      const total = response.data.total || 0;

      setCars(data);
      setFilteredCars(data);
      setTotalPages(response.data.pagination.totalPages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [token, currentPage]);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = cars.filter((car) => {
      const { title, description, tags } = car;
      return (
        title.toLowerCase().includes(query) ||
        description.toLowerCase().includes(query) ||
        (Array.isArray(tags) &&
          tags.some((tag) => tag.toLowerCase().includes(query)))
      );
    });

    setFilteredCars(filtered);
  };

  const handleAddProduct = () => {
    history("/add-product");
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <AppBarComponent
        userName={userName}
        handleAddProduct={handleAddProduct}
      />

      <Container sx={{ mt: 3 }}>
        <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
          <TextField
            label="Search cars... title , description and keywords"
            variant="outlined"
            fullWidth
            onChange={handleSearch}
            value={searchQuery}
          />
        </Box>

        {loading && <Typography>Loading...</Typography>}
        {error && <Typography>Error: {error}</Typography>}

        <Grid container spacing={3}>
          {filteredCars.length > 0 ? (
            filteredCars.map((car, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <CarCard car={car} />
              </Grid>
            ))
          ) : (
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh",
              }}
            >
              <Typography
                variant="h5"
                component="div"
                sx={{ textAlign: "center" }}
              >
                No cars match your search
              </Typography>
            </Grid>
          )}
        </Grid>

        {/* Pagination */}
        <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Container>
    </div>
  );
};

export default CarListPage;
