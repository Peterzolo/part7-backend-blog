const express = require("express");
const {
  addPost,
  getBlogs,
  deleteBlog,
  getBlog,
  likeBlog,
} = require("../controllers/blog");
const { authenticateToken } = require("../utils/middleware");
const blogRouter = express.Router();

blogRouter.post("/", authenticateToken, addPost);
blogRouter.delete("/:id", authenticateToken, deleteBlog);
blogRouter.get("/", getBlogs);
blogRouter.get("/:id", getBlog);
blogRouter.get("/:id/like", likeBlog);

module.exports = blogRouter;
