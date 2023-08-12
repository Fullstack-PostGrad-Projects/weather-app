const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const bcrypt = require("bcrypt");
const {
  createUser,
  grabUserById,
  updateUser,
  grabAllUsers,
  grabUserByUsername,
  getUser,
} = require("../db");

//Grabs all users

router.get("/", async (req, res, next) => {
  try {
    const allUsers = await grabAllUsers();
    res.send(allUsers);
  } catch (error) {
    next();
  }
});

router.post("/register", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (password.length < 8) {
      next({
        name: "errorPasswordLength",
        message: "Password Too Short! Must be at least 8 characters",
        error: "error",
      });
    }
    console.log("before creating user");
    const newUser = await createUser({ username, password });
    console.log(newUser, "this is new user");
    console.log("after creating user");
    const token = jwt.sign({ id: newUser.id, username }, JWT_SECRET, {
      expiresIn: "1w",
    });
    res.send({
      message: "Thanks for signing up!",
      token,
      newUser,
    });
  } catch ({ name, message, error }) {
    next({ name, message, error });
  }
});

//Post --Login
// router.post("/login", async (req, res, next) => {
//   const { username, password } = req.body;
//   if (!username || !password) {
//     next({
//       message: "Please supply both an username and password",
//     });
//     const user = await grabUserByUsername(username);
//     const hashedPassword = user.password;
//     const isValid = await bcrypt.compare(password, hashedPassword);
//     try {
//       if (isValid) {
//         if (user && isValid) {
//           const token = jwt.sign({ id: user.id, email }, JWT_SECRET, {
//             expiresIn: "1w",
//           });
//           res.send({ message: "You're Logged In!", user, token });
//         } else {
//           next({ message: "username or password is incorrect" });
//         }
//       }
//     } catch (error) {
//       next(error);
//     }
//   }
// });

// Post -- Login
// router.post("/login", async (req, res, next) => {
//   const { username, password } = req.body;

//   try {
//     if (!username || !password) {
//       next({
//         message: "Please supply both a username and password",
//       });
//       return; // Return to prevent the code below from executing
//     }
//     console.log("password is", password);
//     const user = await getUser({ username, password });
//     console.log("user after getUser", user);

//     const isValid = await bcrypt.compare(password, hashedPassword);
//     if (!user) {
//       next({ message: "Username or password is incorrect" });
//       return; // Return to prevent the code below from executing
//     }
//     if (isValid) {
//       const token = jwt.sign({ id: user.id, username }, JWT_SECRET, {
//         expiresIn: "1w",
//       });
//       res.send({ message: "You're Logged In!", user, token });
//     } else {
//       next({ message: "Username or password is incorrect" });
//     }
//   } catch (error) {
//     next(error);
//   }
// });
router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      next({
        message: "Please supply both a username and password",
      });
      return; // Return to prevent the code below from executing
    }

    const user = await getUser({ username, password }); // Assuming getUser function works correctly

    if (!user) {
      next({ message: "Username or password is incorrect" });
      return; // Return to prevent the code below from executing
    }

    const isValid = await bcrypt.compare(password, user.password); // Compare the hashed password from the database with the provided password

    if (isValid) {
      const token = jwt.sign({ id: user.id, username }, JWT_SECRET, {
        expiresIn: "1w",
      });
      res.send({ message: "You're Logged In!", user, token });
    } else {
      next({ message: "Username or password is incorrect" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
