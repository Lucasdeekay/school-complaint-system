// backend/utils/comparePassword.js
import { compare } from 'bcryptjs';

const comparePassword = async (password, hashedPassword) => {
  return await compare(password, hashedPassword);
};

export default comparePassword;
