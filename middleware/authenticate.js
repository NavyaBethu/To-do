const jwt=require("jsonwebtoken");
const user=require("../models/userModel");
const authenticate = async (req, res, next) => {
  
  try {
    
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Assumes "Bearer <token>"
  
      if (!token) return res.status(401).json({ message: 'No token provided' });
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); 
      console.log(decoded)
      const User= await user.findByPk(decoded.userId);
  
      if (User) {
        req.userId = User.id;
        next();
      } else {
        res.status(401).json({ message: 'Invalid' });
      }
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized', error: error.message });
    }
  };
  
  module.exports = authenticate;