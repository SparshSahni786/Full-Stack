const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// CREATE - POST /api/students
router.post("/", async (req, res) => {
  try {
    const data = await Student.create(req.body);
    res.status(201).json({ success: true, message: "Student created!", data });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// READ ALL - GET /api/students
router.get("/", async (req, res) => {
  try {
    const data = await Student.find();
    res.json({ success: true, count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// READ SINGLE - GET /api/students/:id
router.get("/:id", async (req, res) => {
  try {
    const data = await Student.findById(req.params.id);
    if (!data) return res.status(404).json({ success: false, message: "Student not found" });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// UPDATE - PUT /api/students/:id
router.put("/:id", async (req, res) => {
  try {
    const data = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!data) return res.status(404).json({ success: false, message: "Student not found" });
    res.json({ success: true, message: "Student updated!", data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE - DELETE /api/students/:id
router.delete("/:id", async (req, res) => {
  try {
    const data = await Student.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ success: false, message: "Student not found" });
    res.json({ success: true, message: "Record Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
