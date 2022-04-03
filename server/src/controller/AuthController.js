import User from "../models/UserModel.js"


var session;

export const auth = async function (req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    next({ code: 400, message: `Invalid Parameters email:${email},password:${password}` });
  }

  const user = await User.findByCredientials(email, password).catch(e => next({ code: 404, message: e.message }));
  if (user) {
    session = req.session;
    session.user_id = user._id;
    res.status(200).send(user.toJSON())
  }
}


export const signup = async function (req, res, next) {
  console.log(req.user);
  const user = new User(req.body);
  const result = await user.save().catch((e) => next(e));
  if (result) res.status(201).send({ message: "Sign Up Success" })
}


export const logout = async function (req, res) {
  if (req.session.user_id) {
    res.session.destroy();
  }
  res.status(200).send({ message: "Logged out" })
}