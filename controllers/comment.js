const Blog = require("../models/Blog");

exports.addComment = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status.json("Blog could not be found");
    }
  } catch (error) {
    res.status(403).json(error);
  }
};
