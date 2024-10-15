const User = require("../models/user.model");

module.exports.requireAuth = async (req, res, next) => {
  if (!req.headers.authorization) {
    res.json({
      code: 400,
      message: "Vui lòng gửi kèm token",
    });
    return;
  }

  const token = req.headers.authorization.split(" ")[1];

  const user = await User.findOne({
    token: token,
    deleted: false,
  }).select("fullName email");

  if (!user) {
    res.json({
      code: 400,
      message: "Token không hợp lệ",
    });
    return;
  }

  res.locals.user = user;

  next();
};
