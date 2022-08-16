const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userLogin = async (req, res) => {
  const enteredUser = {
    email: req.body.email,
    password: req.body.password,
  };

  const getUser = await User.findOne({ email: enteredUser.email });

  if (getUser == null) {
    return res.status(400).send({ error: "Wrong credentials" });
  }

  const user = {
    ...getUser._doc,
    _id: getUser._id.toString(),
  };

  try {
    if (await bcrypt.compare(enteredUser.password, user.password)) {
      const token = jwt.sign(user, process.env.TOKEN_SECRET, {
        expiresIn: "24h",
      });

      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);

      await User.findByIdAndUpdate(
        { _id: user._id },
        { token: refreshToken },
        { new: true }
      );

      res.status(201).send({
        message: "Logged in succesfully",
        token,
        refreshToken,
        isAdmin: user.isAdmin,
        _id: user._id,
      });
    } else {
      res.status(401).send({ error: "Wrong credentials" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const userLogout = async (req, res) => {
  try {
    if (req.body._id.length > 24 || req.body._id.length < 24) {
      return res.status(403).send({ error: "Invalid token" });
    }

    const user = await User.findOne({ _id: req.body._id });

    if (!user.token) {
      return res.status(404).send({ error: "User not logged in" });
    }

    await User.findByIdAndUpdate(
      { _id: req.body._id },
      { token: "" },
      { new: true }
    );

    res.status(200).send({ message: "Logged out succesfully" });
  } catch (error) {
    console.log(error);
  }
};

const addUser = async (req, res) => {
  try {
    const emailExists = await User.findOne({ email: req.body.email });

    if (emailExists) {
      res.status(400).send({ message: "Email already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = {
      email: req.body.email,
      password: hashedPassword,
      isAdmin: req.body.isAdmin,
    };

    await User.create(newUser);

    res.status(201).json({ message: "User succesfully created" });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "Something went wrong, could not create user",
      error: error.message,
    });
  }
};

const userToken = async (req, res) => {
  const refreshToken = req.body.token;

  if (refreshToken == null) {
    res.status(401);
  }

  const userByToken = await User.find({ token: refreshToken });

  if (!userByToken) {
    res.status(401);
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.status(403);
    }
    user = {
      _id: user._id.toString(),
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
    };

    const newToken = jwt.sign(user, process.env.TOKEN_SECRET, {
      expiresIn: "24h",
    });

    res.json({ newToken });
  });
};

module.exports = { userLogin, userLogout, addUser, userToken };
