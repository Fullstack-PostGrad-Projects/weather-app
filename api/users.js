const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const bcrypt = require("bcrypt");
const { createUser, grabUserById, updateUser, grabAllUsers } = require("../db");

router.post("/register", async (req, res, next) => {
  const { name, password } = req.body;
  try {
    if (password.length < 8) {
      next({
        name: "errorPasswordLength",
        message: "Password Too Short! Must be at least 8 characters",
        error: "error",
      });
    }
    console.log("before creating user")
    const newUser = await createUser({ name, password });
    console.log(newUser, "this is new user")
    console.log("after creating user")
    const token = jwt.sign({ id: newUser.id, name }, JWT_SECRET, {
      expiresIn: "1w",
    });
    res.send({
        message: "Thanks for signing up!",
        token,
        newUser,
    });
  } catch ({name,message,error}) {
    next({name,message,error});
  }
});

module.exports = router
