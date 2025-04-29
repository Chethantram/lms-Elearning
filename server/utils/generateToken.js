import jwt from "jsonwebtoken";

export const generateToken = async (res, user) => {
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  return res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 20 * 60 * 60 * 1000,//1 day
    }).json({
        success:true,
        user,
        message: `Welcome back ${user.name}`
    })
};
