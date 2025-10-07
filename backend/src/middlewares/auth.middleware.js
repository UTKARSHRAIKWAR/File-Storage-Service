import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    res.status(401);
    throw new Error("no token, authorization denied");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("token not valid or expired");
  }
};

export default auth;
