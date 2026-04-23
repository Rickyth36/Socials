const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const authRouter = require("../routes/auth.routes");
const bcrypt = require('bcryptjs');

async function loginController (req, res){
  const { username, email, password } = req.body;
  // const user = userModel.find({ email, password });
  const user = await userModel.findOne({
    $or: [
      {
        username,
      },
      {
        email,
      },
    ],
  });
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  // const hashed = crypto.createHash("sha256").update(password).digest("hex");
  // const isPasswordSame = user.password === hashed;

  const isPasswordSame = await bcrypt.compare(password, user.password);

  if (!isPasswordSame) {
    return res.status(401).json({
      message: "Password invalid",
    });
  }
  const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.cookie("token", token);
  res.status(200).json({
    message: "User logged in successfully",
    user: {
      username: user.name,
      email: user.email,
      bio: user.bio,
      profileimage: user.profile_img,
    },
  });
}


async function registerController (req, res) {
  const { username, email, password, profile_img, bio } = req.body;
  const isUserExistByEmail = await userModel.findOne({ email });

  if (isUserExistByEmail) {
    return res.status(409).json({
      message: "User already exists with same email",
    });
  }

  const isUserExistByUsername = await userModel.findOne({ username });

  if (isUserExistByUsername) {
    return res.status(409).json({
      message: "User already exists by username",
    });
  }

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExists) {
    return res.status(409).json({
      message:
        "User already exists" + isUserExistByEmail
          ? "Email already exists"
          : "Username already exists",
    });
  }

  // const hashed = crypto.createHash("sha256").update(password).digest("hex");
  const hashed = await bcrypt.hash(password, 10);


  const user = await userModel.create({
    username,
    email,
    password: hashed,
    profile_img,
    bio,
  });

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  res.cookie("token", token);

  res.status(200).json({
    message: "User registered successfully",
  });
}

module.exports = {
    registerController,
    loginController
}