// require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/carMangment";
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./config/swaggerOptions");
require("dotenv").config();
app.use(express.json());
app.use(cors());
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use("/api", routes);

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
