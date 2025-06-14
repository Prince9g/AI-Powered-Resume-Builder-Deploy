import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
  const token = req.cookies?.token;
  // console.log(token);

  if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};
