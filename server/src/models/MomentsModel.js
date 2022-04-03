import mongoose from 'mongoose';

const { Schema } = mongoose;

const momentsSchema = new Schema({
  title: { type: String, required: true },
  tags: [String],
  file: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
}, { timestamps: true });

momentsSchema.methods.toJSON = function () {
  const moment = this;
  const momentObj = moment.toObject();
  delete momentObj.__v;
  delete momentObj.createdAt;
  delete momentObj.updatedAt;
  return momentObj;
};

export default mongoose.model("Moments", momentsSchema);