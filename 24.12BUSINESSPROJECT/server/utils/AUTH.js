import bcrypt from "bcrypt";

const bcryptSecretKey = process.env.ENCYPTION_SECRET;

export async function hashPassword(userPassword) {
  const saltRounds = 10;
  const combinedPassword = userPassword + bcryptSecretKey;
  const hashedPassword = await bcrypt.hash(combinedPassword, saltRounds);
  return hashedPassword;
}

export async function comparePassword(userPassword, hashedPassword) {
  const combinedPassword = userPassword + bcryptSecretKey;
  return await bcrypt.compare(combinedPassword, hashedPassword);
}
