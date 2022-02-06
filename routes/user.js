const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express();

router.post("/register", async (req, res) => {
  const { fisrtName, lastName, username, password } = req.body;
  // console.log(req.body);
  const oldUser = await User.findOne({ username });
  // console.log(req.body);
  if (oldUser) return res.status(409).send("User already exist");
  // console.log(req.body);
  encryptedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    fisrtName,
    lastName,
    username,
    password: encryptedPassword,
  });
  console.log(req.body);

  await newUser.save();
  return res.status(200).send("success");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    const match = bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign(
        { user_id: user.id, username },
        process.env.SECRET_TOKEN
      );
      user.token = token;
      await user.save();
      res.send("loggedin successfully");
    } else {
      res.send("invalid password");
    }
  } else {
    return res.status(400).send("invalid credentials");
  }
});

router.get("/userList", auth, async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

router.post("/userDetails", auth, async (req, res) => {
  res.send(req.user);
});

module.exports = router;
