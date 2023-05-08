const express = require("express");
const userRouter = express.Router();
const { addUser, getUsers, getUser } = require("../controllers/user");

userRouter.post("/", addUser);
userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);

module.exports = userRouter;
