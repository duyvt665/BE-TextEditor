const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authenticateToken = (req, res, next) => {
   // Website you wish to allow to connect
   res.setHeader('Access-Control-Allow-Origin', '*');

   // Request methods you wish to allow
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

   // Request headers you wish to allow
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

   // Set to true if you need the website to include cookies in the requests sent
   // to the API (e.g. in case you use sessions)
   res.setHeader('Access-Control-Allow-Credentials', true);
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Access token not provided" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }

    try {
      const foundUser = await User.findById(user._id);
      if (!foundUser) {
        return res.status(404).json({ error: "User not found" });
      }
      req.user = foundUser;
      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Unable to authenticate token" });
    }
  });
};

module.exports = authenticateToken;
