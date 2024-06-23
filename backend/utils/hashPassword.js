// backend/utils/hashPassword.js
import { genSalt, hash } from 'bcryptjs';

const hashPassword = async (password) => {
  const salt = await genSalt(10);
  return await hash(password, salt);
};

export default hashPassword;
