import jwt from "jsonwebtoken";
import Logger from "../../helpers/logger";
import environment from "../../config/environment";

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, environment.JWT_SECRET);
    return decoded;
  } catch (error) {
    Logger.error("Error verifying token:", error);
    return null;
  }
};
