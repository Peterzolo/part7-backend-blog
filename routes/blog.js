const express = require("express");
const { addPost, getBlogs, deleteBlog } = require("../controllers/blog");
const { authenticateToken } = require("../utils/middleware");
const blogRouter = express.Router();

blogRouter.post("/", authenticateToken, addPost);
blogRouter.delete("/:id", authenticateToken, deleteBlog);
blogRouter.get("/", getBlogs);

module.exports = blogRouter;
