require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("🍃 MongoDB connected successfully"))
	.catch((err) => console.log("❌ MongoDB connection error: ", err))

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>
	console.log(`🚀 Server started successfully on port ${PORT}`)
)
