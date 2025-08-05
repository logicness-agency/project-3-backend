// making it CRU , so there wont be a problem when a category gets deleted... max 10 category so its not overwhelming 

const router = require("express").Router();
const Category = require("../models/Category.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");



// GET /categories – Get all categories for the authenticated user
router.get("/categories", isAuthenticated, (req, res, next) => {
  Category.find({ owner: req.payload._id })
    .then((categories) => res.json(categories))
    .catch(next);
});


// POST /categories – Create new category if user has < 10
router.post("/categories", isAuthenticated, async (req, res, next) => {
  try {
    const count = await Category.countDocuments({ owner: req.payload._id });

    if (count >= 10) {
      return res
        .status(400)
        .json({ message: "You can create up to 10 categories only." });
    }

    const newCategory = { ...req.body, owner: req.payload._id };
    const createdCategory = await Category.create(newCategory);

    res.status(201).json(createdCategory);
  } catch (error) {
    next(error);
  }
});

// PUT /categories/:categoryId – Update category name
router.put("/categories/:categoryId", isAuthenticated, (req, res, next) => {
  Category.findOneAndUpdate(
    { _id: req.params.categoryId, owner: req.payload._id },
    req.body,
    { new: true }
  )
    .then((updatedCategory) => res.json(updatedCategory))
    .catch(next);
});



module.exports = router;