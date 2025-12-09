import jwt, { SignOptions, Secret, JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";

export function signToken(payload: string | object): string {
  const secret: Secret = process.env.JWT_SECRET!;

  const options: SignOptions = {
    // Cast expiresIn to any to satisfy TypeScript
    expiresIn: (process.env.JWT_EXPIRES_IN as any) || "1d",
  };

  return jwt.sign(payload, secret, options);
}

export function verifyToken(token: string): string | JwtPayload {
  const secret: Secret = process.env.JWT_SECRET!;
  return jwt.verify(token, secret);
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
