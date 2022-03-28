function resultWithPagination(model) {
  return async (req, res, next) => {
    let { page, size } = req.query;
    if (!page) {
      page = 1;
    }
    if (!size) {
      size = 5;
    }
    const limit = parseInt(size);
    const skip = (page - 1) * size;
   const sort = { opposition: 1,Opposition: 1, }
    try {
      const totalPages = await model.countDocuments().exec();
     const results = await model.find().sort(sort).limit(limit).skip(skip).exec();
      res.json({results, totalPages})
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
}

module.exports = resultWithPagination;
