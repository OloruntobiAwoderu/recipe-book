const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    // eslint-disable-next-line no-undef
    jwt.verify(token, process.env.JWT_SECRET || "oloruntobi", (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Not verified" });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "You shall not pass!" });
  }
};