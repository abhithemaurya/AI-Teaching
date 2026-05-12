import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const verifyToken = (req) => {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    throw new Error("No token provided");
  }

  if (!authHeader.startsWith("Bearer ")) {
    throw new Error("Invalid token format");
  }

  const token = authHeader.split(" ")[1];

  try {
    console.log("RAW TOKEN:", token);
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};