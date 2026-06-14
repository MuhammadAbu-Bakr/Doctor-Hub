import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "doctor-hub-super-secret-key-123456";

export interface TokenPayload {
  userId: string;
  role: string;
}

export function generateToken(userId: string, role: string): string {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 10);
}

export function comparePassword(plain: string, hash: string): boolean {
  return bcrypt.compareSync(plain, hash);
}
