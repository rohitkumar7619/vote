const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const connectDB = require("./backend/config"); // Assuming this is for other configurations

const homeRoutes = require("./backend/routes/homeRoutes");
const authRoutes = require("./backend/routes/authRoutes");
const voteRoutes = require("./backend/routes/voteRoutes");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("frontend/public"));
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));

// MongoDB Connection (Adjust as per your MongoDB URI)DoQkMNR8GzO9xzw9
const MONGO_URI = "mongodb+srv://rohitkumargupta7619853390:DoQkMNR8GzO9xzw9@cluster0.dxspojz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// View Engine
app.set("view engine", "ejs");
app.set("views", "../frontend/views"); // Adjust this path as per your project structure

// Routes
app.use("/", authRoutes);
app.use("/", voteRoutes);
app.use("/", homeRoutes);

// Server Listening
const PORT = process.env.PORT || 5000; // Use environment variable for port or fallback to 5000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
