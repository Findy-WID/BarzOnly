// require("dotenv").config();
// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Enable CORS
// app.use(cors());

// // Route to fetch music data
// app.get("/api/music", async (req, res) => {
//     try {
//         const response = await axios.get("https://api.deezer.com/chart");
//         res.json(response.data);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching music data", error: error.message });
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });

// app.get("/", (req, res) => {
//     res.send("Music API is running...");
//   });

import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Function to fetch a specific category from Deezer
const fetchCategory = async (categoryId) => {
  try {
    const response = await axios.get(`https://api.deezer.com/chart/${categoryId}`);
    return response.data.tracks.data;
  } catch (error) {
    console.error(`Error fetching category ${categoryId}:`, error.message);
    return [];
  }
};

// Route to fetch multiple categories
app.get("/music", async (req, res) => {
  try {
    const trending = await fetchCategory(""); // Default chart (all trending)
    const pop = await fetchCategory(132);
    const hiphop = await fetchCategory(116);
    const rock = await fetchCategory(152);

    res.json({
      trending,
      pop,
      hiphop,
      rock,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch music categories" });
  }
});

// Root route (optional)
app.get("/", (req, res) => {
  res.send("Music API is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
