const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //Getting the token from the header
      token = req.headers.authorization.split(" ")[1];

      //Verify the token

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //Get the id from the verified token

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorised!");
    }
  }

  if(!token) {
    res.status(401)
    throw new Error('Not authorised cause no token!')
  }
});

module.exports = { protect };
