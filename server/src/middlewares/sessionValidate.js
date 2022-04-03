import User from "../models/UserModel.js";



const sessionValidate = async function (req, res, next) {
  const _id = req.session.user_id;
  const user = await User.findOne({ _id });
  if (user) {
    req.user = user.toJSON();
    next();
    return;
  }

  res.status(401).send({ message: "Session Timed Out" })

}

export default sessionValidate;