// backend/controllers/authController.js
import Student, { findOne, findById } from '../models/Student';
import { sign, verify } from 'jsonwebtoken';
import { jwtSecret } from '../config';
import hashPassword from '../utils/hashPassword';
import comparePassword from '../utils/comparePassword';

const register = async (req, res) => {
  const { firstName, lastName, matricNumber, email, password } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    const student = new Student({ firstName, lastName, matricNumber, email, password: hashedPassword });
    await student.save();
    res.send({ message: 'Student registered successfully' });
  } catch (error) {
    res.status(400).send({ error: 'Student already exists or other error' });
  }
};


const registerAdmin = async (req, res) => {
  const { firstName, lastName, email, password, category } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    const admin = new Admin({ firstName, lastName, email, password: hashedPassword, category });
    await admin.save();
    res.send({ message: 'Admin registered successfully' });
  } catch (error) {
    res.status(400).send({ error: 'Admin already exists or other error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await Student.findOne({ email });
    let userType = 'student';
    
    if (!user) {
      user = await Admin.findOne({ email });
      userType = 'admin';
    }

    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).send({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id, userType }, JWT_SECRET, { expiresIn: '1h' });
    res.send({ token, userType });
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await findById(req.userId);
    if (!user || !(await comparePassword(oldPassword, user.password))) {
      return res.status(401).send({ error: 'Old password is incorrect' });
    }
    user.password = await hashPassword(newPassword);
    await user.save();
    res.send({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: 'User with given email does not exist' });
    }
    res.send({ userId: user._id });
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
};

const resetPassword = async (req, res) => {
  const { userId, newPassword } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).send({ error: 'User not found' });
    }
    user.password = await hashPassword(newPassword);
    await user.save();
    res.send({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
};

export default {
  register,
  registerAdmin,
  login,
  changePassword,
  forgotPassword,
  resetPassword
};
