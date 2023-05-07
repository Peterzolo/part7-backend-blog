const express = require("express");
const {
  addPost,
  getBlogs,
  deleteBlog,
  likePost,
  getBlog,
} = require("../controllers/blog");
const { authenticateToken } = require("../utils/middleware");
const blogRouter = express.Router();

blogRouter.post("/", authenticateToken, addPost);
blogRouter.delete("/delete/:id", authenticateToken, deleteBlog);
blogRouter.get("/", getBlogs);
blogRouter.put("/:id/like", authenticateToken, likePost);
blogRouter.get("/:id", getBlog);

module.exports = blogRouter;
