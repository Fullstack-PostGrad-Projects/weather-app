const apiRouter = require("express").Router();
const { JWT_SECRET } = process.env;
const jwt = require("jsonwebtoken");
const { getUserById } = require("../db");
const userRouter = require("./users");
const starredRouter = require("./starred");

apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        req.user = await getUserById(id);

        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction",
  });
});

apiRouter.get("/health", (req, res, next) => {
  res.send({
    healthy: true,
  });
});

//our routes
apiRouter.use("/users", userRouter);
apiRouter.use("/starred", starredRouter);

apiRouter.use((req, res, next) => {
  next({
    error: "Error!",
    name: "PageNotFound",
    message: "The page you are looking for is not here",
    status: 404,
  });
});

apiRouter.use((error, req, res, next) => {
  let errorStatus = 400;
  if (error.status) {
    errorStatus = error.status;
  }

  res.status(errorStatus).send({
    message: error.message,
    name: error.name,
    error: error.error,
  });
});
