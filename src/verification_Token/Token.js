const JWT = require("jsonwebtoken");

const data = (req, res, next) => {
  const Token = req.header("Authorization");
  if (!Token) {
    return res.status(401).json({ message: "token not provided" });
  }
  JWT.verify(Token, process.env.secretKey, (error, user) => {
    if (error) {
      return res.status(403).json({ message: "invalid Token" });
    }
    if (user.email != req.body.email) {
        return res.status(403).json({message:"token does not mach"})
      }
    res.user=user
    next()
  });
};
module.exports=data
