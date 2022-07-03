import jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
    return jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
};

export const generateRefreshToken = (user) => {
    return jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "365d" }
    );
};