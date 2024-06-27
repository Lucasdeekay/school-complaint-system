const Student = require("../models/Student");
const Admin = require("../models/Admin");
const { sign } = require("jsonwebtoken");
const hashPassword = require("../utils/hashPassword");
const comparePassword = require("../utils/comparePassword");

const { jwtSecret } = require("../config");
const JWT_SECRET = jwtSecret;

const register = async (req, res) => {
  const { firstName, lastName, matricNumber, email, password } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    const student = new Student({
      firstName,
      lastName,
      matricNumber,
      email,
      password: hashedPassword,
    });
    await student.save();
    res.send({ message: "Student registered successfully" });
  } catch (error) {
    res.status(400).send({ error: "Student already exists or other error" });
  }
};

const registerAdmin = async (req, res) => {
  const { firstName, lastName, email, password, category } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    const admin = new Admin({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      category,
    });
    await admin.save();
    res.send({ message: "Admin registered successfully" });
  } catch (error) {
    res.status(400).send({ error: "Admin already exists or other error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await Student.findOne({ email });
    let userType = "student";

    if (!user) {
      user = await Admin.findOne({ email });
      userType = "admin";
    }

    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).send({ error: "Invalid email or password" });
    }

    const token = sign({ userId: user._id, userType }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.send({ token, userType });
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    let user = await Student.findById(req.userId);
    if (!user) {
      user = await Admin.findById(req.userId);
    }

    if (!user || !(await comparePassword(oldPassword, user.password))) {
      return res.status(401).send({ error: "Old password is incorrect" });
    }

    user.password = await hashPassword(newPassword);
    await user.save();
    res.send({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    let user = await Student.findOne({ email });
    let userType = "student";

    if (!user) {
      user = await Admin.findOne({ email });
      userType = "admin";
    }

    if (!user) {
      return res
        .status(400)
        .send({ error: "User with given email does not exist" });
    }

    res.send({ userId: user._id, userType });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

const resetPassword = async (req, res) => {
  const { userId, newPassword } = req.body;
  try {
    let user = await Student.findById(userId);
    if (!user) {
      user = await Admin.findById(userId);
    }

    if (!user) {
      return res.status(400).send({ error: "User not found" });
    }

    user.password = await hashPassword(newPassword);
    await user.save();
    res.send({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
};

module.exports = {
  register,
  registerAdmin,
  login,
  changePassword,
  forgotPassword,
  resetPassword,
};
