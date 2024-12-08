const express = require("express");
const router = express.Router();
const Bug = require("../models/Bug");

// Add a new bug
router.post("/", async (req, res) => {
  const { title, description, assignee } = req.body;
  const newBug = new Bug({ title, description, assignee });
  await newBug.save();
  res.status(201).json({ message: "Bug added successfully" });
});

// Get all bugs
router.get("/", async (req, res) => {
  const bugs = await Bug.find();
  res.status(200).json(bugs);
});

// Update bug status
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  await Bug.findByIdAndUpdate(id, { status });
  res.status(200).json({ message: "Bug updated successfully" });
});

module.exports = router;
