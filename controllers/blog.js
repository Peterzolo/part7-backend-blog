const Blog = require("../models/Blog");
const User = require("../models/User");

exports.addPost = async (req, res) => {
  const body = req.body;
  const userId = req.user;

  try {
    const user = await User.findById(userId);
    const newBlog = new Blog({
      author: user.name,
      title: body.title,
      url: body.url,
      likes: 0,
      userId,
    });

    const savedBlog = await newBlog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    res.status(200).json({ result: savedBlog });
  } catch (error) {
    res.status(403).json(error);
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const posts = await Blog.find().populate("userId");
    if (!posts.length) {
      return res.status(400).json({ message: "No post was found" });
    }
    res.status(200).json({ result: posts });
  } catch (error) {
    res.status(403).json(error);
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.user;
    const blog = await Blog.findById(id);
    if (blog.userId.toString() !== user.toString()) {
      return res.status(403).json("You cannot delete this blog");
    }
    const deletedBlog = await Blog.findByIdAndRemove(id);
    if (!deletedBlog) {
      res.status(400).json("Could not delete blog");
    } else {
      res.status(200).json("Blog deleted");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.likePost = async (req, res) => {
  try {
    console.log("Like post works");
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(400).send("Could not fetch blog");
    }
    res.status(200).send({ result: blog });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
