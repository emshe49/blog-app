import User from "../model/userModel.js";
import jwt from "jsonwebtoken";

const authMiddleware = {
  verifyToken: async (req, res, next) => {
    const token = req.cookies.EssaRaza;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized. Please sign in." });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
      req.user = user; // Attach user to request
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired session. Please sign in again." });
    }
  },
  
  authorizeRole: (...roles) => {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const flatRoles = roles.flat();
      if (flatRoles.length > 0 && !flatRoles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access forbidden: insufficient permissions." });
      }
      next();
    };
  },
};

export default authMiddleware;
