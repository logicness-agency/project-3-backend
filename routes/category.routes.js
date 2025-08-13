const router = require("express").Router();
const Category = require("../models/Category.model");
const Task = require("../models/Task.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

// GET /categories – get all categories 
router.get("/categories", isAuthenticated, async (req, res, next) => {
  try {
    const cats = await Category.find({ owner: req.payload._id }).sort({ name: 1 });
    res.json(cats);
  } catch (err) {
    next(err);
  }
});

// POST /categories – creat a category
router.post("/categories", isAuthenticated, async (req, res, next) => {
  try {
    const newCategory = {
      name: req.body.name?.trim(),
      owner: req.payload._id,
    };
    if (!newCategory.name) {
      return res.status(400).json({ message: "Category name is required." });
    }
    const created = await Category.create(newCategory);
    res.status(201).json(created);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "You already have a category with this name." });
    }
    next(err);
  }
});

// PUT /categories/:categoryId – change name
router.put("/categories/:categoryId", isAuthenticated, async (req, res, next) => {
  try {
    const updated = await Category.findOneAndUpdate(
      { _id: req.params.categoryId, owner: req.payload._id },
      { $set: { name: req.body.name?.trim() } },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "Category not found" });
    res.json(updated);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "You already have a category with this name." });
    }
    next(err);
  }
});

// DELETE /categories/:categoryId – delete and undock from task
router.delete("/categories/:categoryId", isAuthenticated, async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const ownerId = req.payload._id;

    const deleted = await Category.findOneAndDelete({ _id: categoryId, owner: ownerId });
    if (!deleted) return res.status(404).json({ message: "Category not found" });

    await Task.updateMany(
      { owner: ownerId, category: categoryId },
      { $set: { category: null } }
    );

    return res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
