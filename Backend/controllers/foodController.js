import foodModel from "../models/foodModel.js";
import fs from 'fs';
import path from 'path';

// Controller function to add a food item
const addFood = async (req, res) => {
  try {
    const { name, description, price, category, sizes } = req.body;

    // Ensure sizes is an array, split by commas and trim any spaces
    const sizesArray = sizes ? sizes.split(',').map(size => size.trim()) : [];

    // Validate required fields
    if (!name || !description || !price || !category || sizesArray.length === 0) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Ensure that a file has been uploaded
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    const image_filename = req.file.filename;

    // Create a new food document and save it to the database
    const food = new foodModel({
      name,
      description,
      price,
      category,
      image: image_filename,
      sizes: sizesArray
    });

    await food.save();
    res.status(201).json({ success: true, message: "Food added successfully", food });
  } catch (error) {
    console.error("Error adding food:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Controller function to list all food items
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find();
    if (foods.length === 0) {
      return res.status(404).json({ success: false, message: "No food items found" });
    }
    res.json({ success: true, data: foods });
  } catch (error) {
    console.error("Error listing food:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Controller function to remove a food item
const removeFood = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ success: false, message: "Food ID is required" });
    }

    const food = await foodModel.findById(id);
    if (!food) {
      return res.status(404).json({ success: false, message: "Food not found" });
    }

    // Delete the image file from the server
    const imagePath = path.join(__dirname, '..', 'uploads', food.image);

    fs.stat(imagePath, (err, stats) => {
      if (err || !stats.isFile()) {
        console.error("Error checking file existence:", err);
        return;  // If the file doesn't exist, we don't need to try deleting it
      }

      // If the file exists, delete it
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error deleting image file:", err);
        } else {
          console.log("Image file deleted:", imagePath);
        }
      });
    });

    // Delete the food item from the database
    await foodModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Food deleted successfully" });
  } catch (error) {
    console.error("Error removing food:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export { addFood, listFood, removeFood };
