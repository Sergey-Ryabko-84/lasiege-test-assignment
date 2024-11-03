require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("🍃 MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`🚀 Server started successfully on port ${PORT}`);
    });
  })
  .catch((err) => console.log("❌ MongoDB connection error: ", err));
