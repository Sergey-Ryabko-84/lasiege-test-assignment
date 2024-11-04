const express = require("express");
const cors = require("cors");
// const bodyParser = require("body-parser");

const { productRoutes, categoryRoutes, cartRoutes, orderRoutes } = require("./routes");

const app = express();

// app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  console.log("/test");
  res.send("Test route is working!");
});

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.use((req, res, next) => {
  console.log("app.use Route not found");
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.log("app.use Internal Server Error");
  const { status = 500, message = "Internal Server Error" } = err;
  res.status(status).json({ message: message });
});

module.exports = app;
