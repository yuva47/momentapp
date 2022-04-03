import mongoose from 'mongoose';
import bcrypt from "bcrypt"
import User from "../models/UserModel.js"
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: String,
  mobile: Number,
  email: { required: [true, "Email required"], type: String, index: true, unique: true },
  city: String,
  password: { type: String, required: true },
},
  { timestamps: true });


userSchema.pre("save", function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = bcrypt.hashSync(user.password, 8);
  }
  next();
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.__v;
  delete userObject.createdAt;
  delete userObject.updatedAt;
  return userObject;
};

userSchema.statics.findByCredientials = async (email, pwd) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Unable to login");

  const isValid = bcrypt.compareSync(pwd, user.password);

  if (!isValid) throw new Error("Unable to login");

  return user;
};

export default mongoose.model("User", userSchema);