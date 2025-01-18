import jsonwebtoken from "jsonwebtoken";

export async function verifyToken(req, res, next) {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({
      message: "Access Denied! Unauthorized User",
    });
  }

  try {
    jsonwebtoken.verify(token, process.env.SECRET_KEY, (err, authData) => {
      if (err) {
        return res.status(401).json({
          message: "Invalid Token",
        });
      }
      
      req.user = authData.user;
      next();
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}
