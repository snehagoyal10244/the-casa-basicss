const Bundle = require('../models/Bundle');

exports.getBundles = async (req, res, next) => {
  try {
    const bundles = await Bundle.find({ isActive: true });
    res.json({ success: true, bundles });
  } catch (err) {
    next(err);
  }
};

exports.getBundleById = async (req, res, next) => {
  try {
    const bundle = await Bundle.findOne({ $or: [{ _id: req.params.id }, { slug: req.params.id }], isActive: true });
    if (!bundle) return res.status(404).json({ success: false, message: 'Bundle not found.' });
    res.json({ success: true, bundle });
  } catch (err) {
    next(err);
  }
};

exports.createBundle = async (req, res, next) => {
  try {
    const bundle = await Bundle.create(req.body);
    res.status(201).json({ success: true, bundle });
  } catch (err) {
    next(err);
  }
};

exports.updateBundle = async (req, res, next) => {
  try {
    const bundle = await Bundle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!bundle) return res.status(404).json({ success: false, message: 'Bundle not found.' });
    res.json({ success: true, bundle });
  } catch (err) {
    next(err);
  }
};

