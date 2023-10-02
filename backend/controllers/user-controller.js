const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  let isUserExist;
  try {
    isUserExist = await User.findOne({ email: email });
  } catch (error) {
    console.log(error);
  }
  if (isUserExist) {
    return res.status(400).json({ message: "User is already exist" });
  }
  const user = new User({
    firstName,
    lastName,
    email,
    password: bcrypt.hashSync(password),
  });
  try {
    await user.save();
  } catch (error) {
    console.log(error);
  }
  return res.status(201).json({ message: "new user created successfully" });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  let isUserExist;
  try {
    isUserExist = await User.findOne({ email });
  } catch (error) {
    return new Error(error);
  }
  if (!isUserExist) {
    return res.status(404).json({ message: "User not found" });
  }

  const checkPassword = bcrypt.compareSync(password, isUserExist.password);
  if (!checkPassword) {
    return res.status(404).json({ message: "Invalid Email/Password!" });
  }
  const token = jwt.sign({ id: isUserExist._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
  console.log("Generated Token\n", token);

  if (req.cookies[`${isUserExist._id}`]) {
    req.cookies[`${isUserExist._id}`] = "";
  }

  res.cookie(String(isUserExist._id), token, {
    path: "/",
    expires: new Date(Date.now() + 1000 * 30),
    httpOnly: true,
    sameSite: "lax",
  });
  return res
    .status(200)
    .json({ message: "Successfully Logged In", accessToken: token });
};
const verifyToken = (req, res, next) => {
  const cookies = req.headers.authorization;
  if (cookies === undefined) {
    res.status(401).json({ message: "Token not found!" });
  }
  const token = cookies.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Token not found!" });
  }
  jwt.verify(String(token), process.env.JWT_SECRET_KEY, (error, user) => {
    if (error) {
      res.status(401).json({ message: "Invalid Token" });
      return;
    }
    req.id = user.id;
  });
  next();
};

const getUser = async (req, res) => {
  const userId = req.id;
  let user;
  try {
    user = await User.findById(userId, "-password");
  } catch (error) {
    return new Error(error);
  }
  if (!user) {
    res.status(404);
    return;
  }
  // res.setHeader("Content-Type", "application/json");
  return res.status(200).json({ user });
};

const logout = (req, res, next) => {
  const cookies = req.headers.cookie;
  const prevToken = cookies.split("=")[7];
  if (!prevToken) {
    return res.status(400).json({ message: "Token not found!" });
  }
  jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Authentication failed" });
    }
    res.clearCookie(`${user.id}`);
    req.cookies[`${user.id}`] = "";
    return res.status(200).json({ message: "Logged out Successfully" });
  });
};

exports.signup = signup;
exports.login = login;
exports.verifyToken = verifyToken;
exports.getUser = getUser;
// exports.refreshToken = refreshToken
exports.logout = logout;
