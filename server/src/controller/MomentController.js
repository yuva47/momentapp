import Moment from "../models/MomentsModel.js";
import fs from "fs";
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

export const getMomentById = async function (req, res, next) {
  const { id } = req.params;
  if (!id) {
    next({ code: 400, message: "Invalid Parameters" })
    return;
  }

  const moment = await Moment.findById(id).catch((e) => next({ code: 500, message: e.message }));
  if (moment && moment.owner.toString() !== req.user._id.toString()) {
    next({ code: 401, message: "You are not allowed to use this moment" });
    return;
  }

  if (moment) res.status(200).send(moment.toJSON());
  else next({ code: 404, message: "Invalid moment id" })
}


export const getMoments = async function (req, res) {
  const moments = await Moment.find({ owner: req.user._id });
  res.status(200).send(moments || [])

}

export const createMoment = async function (req, res, next) {
  const { title, tags } = req.body;
  const owner = req.user._id;
  const moment = new Moment({ title, tags, file: req.file.filename, owner })
  await moment.save().catch((e) => next({ code: 400, message: "Invalid Parameters" }));;
  res.status(200).send({ message: "Moment Created" });
}


export const delelteMoment = async function (req, res) {
  const { id } = req.params;
  if (!id) {
    next({ code: 400, message: "Invalid Parameters" })
    return;
  }
  const existingMoment = await Moment.findById(id);
  if (existingMoment && existingMoment.owner.toString() !== req.user._id.toString()) {
    next({ code: 401, message: "You are not allowed to use this moment" });
    return;
  }
  if (existingMoment) {
    await deleteFile(existingMoment.file);
  }

  const moment = await Moment.findByIdAndDelete(id).catch((e) => next({ code: 500, message: e.message }));

  if (moment) res.status(200).send({ message: "Deleted" });
  else next({ code: 500, message: "Deletion Failed" })

}


export const updateMoment = async function (req, res) {
  const { id } = req.params;
  if (!id) {
    next({ code: 400, message: "Invalid Parameters" })
    return;
  }
  const { title, tags } = req.body;
  const owner = req.user._id;
  const moment = { title, tags, file: req.file.filename, owner }

  const existingMoment = await Moment.findById(id);
  if (existingMoment && existingMoment.owner.toString() !== req.user._id.toString()) {
    next({ code: 401, message: "You are not allowed to use this moment" });
    return;
  }
  if (existingMoment) {
    await deleteFile(existingMoment.file);
  }

  const newMoment = await Moment.findOneAndUpdate({ _id: id }, { $set: moment });

  if (newMoment) res.status(200).send(newMoment.toJSON());
  else next({ code: 500, message: "Update Failed" });
}

export const getImage = async function (req, res) {
  const { id } = req.params;
  if (!id) {
    next({ code: 400, message: "Invalid Parameters" })
    return;
  }
  const existingMoment = await Moment.findById(id);
  if (existingMoment && existingMoment.owner.toString() !== req.user._id.toString()) {
    next({ code: 401, message: "You are not allowed to use this moment" });
    return;
  }

  const fpath = getPath(existingMoment.file);
  console.log(fpath);
  res.sendFile(fpath);
}


async function deleteFile(filename) {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const filePath = path.resolve(__dirname, "../../uploads", filename);
  fs.rm(filePath, (err) => {
    console.log(err)
  });
}


function getPath(filename) {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const filePath = path.resolve(__dirname, "../../uploads", filename);
  return filePath;

}