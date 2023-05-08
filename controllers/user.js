const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.addUser = async (req, res) => {
  const { username, name, password } = req.body;
  if (!username || !name || !password) {
    return res.status(404).json({ message: "All fields must be entered" });
  }

  if (username.length < 3 || password.length < 3) {
    return res.status(400).json({
      errorMessage: "Username and password must be at least 3 characters long",
    });
  }
  try {
    const saltRounds = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();

    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users.length) {
      res.status(400).json("Users not found").populate("blogs");
    } else {
      res.status(200).json(users);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getUser = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id).populate("blogs");
  if (!user) {
    return res.status(400).json("User not found");
  }
  res.status(200).json({ result: user });
};
