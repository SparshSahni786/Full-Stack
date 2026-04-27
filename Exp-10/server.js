const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/collegeDB")
  .then(() => console.log("✅ Database Connected Successfully"))
  .catch(err => console.log("❌ Connection Error:", err));

const studentRoutes = require("./routes/studentRoutes");
app.use("/api/students", studentRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Experiment 10 - CRUD API is Running!" });
});

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
