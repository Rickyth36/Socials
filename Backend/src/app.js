const express = require("express");
const cookie = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookie());

const authRouter = require("./routes/auth.routes");
const postRouter = require("./routes/posts.routes");
const userRouter = require('./routes/user.routes');

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/user",userRouter);

module.exports = app;
