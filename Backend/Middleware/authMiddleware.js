import User from "../model/userModel.js";
import jwt from "jsonwebtoken";

const authMiddleware = {
  verifyToken: async (req, res, next) => {
    const token = req.cookies.EssaRaza;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      req.user = user; // Attach user to request
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  },
  
  authorizeRole: (role) => {
  return (req, res, next) => {
    if (!req.user) {
      console.log(req.user)
      console.log("User not found in request."); // Debugging log
      return res.status(401).json({ message: "Unauthorized" });
    }

    console.log("User role:", req.user.role); // Debugging log
    console.log("Required role:", role); // Debugging log

    if (req.user.role !== role) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
},
};

export default authMiddleware;



