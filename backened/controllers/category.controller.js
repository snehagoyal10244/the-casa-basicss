const Category = require('../models/Category');

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort('name');
    res.json({ success: true, categories });
  } catch (err) {
    next(err);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const cat = await Category.create(req.body);
    res.status(201).json({ success: true, category: cat });
  } catch (err) {
    next(err);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const cat = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cat) return res.status(404).json({ success: false, message: 'Category not found.' });
    res.json({ success: true, category: cat });
  } catch (err) {
    next(err);
  }
};

