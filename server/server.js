import express from "express";
import authRouter from "./src/routes/auth.js";
import momentRouter from "./src/routes/moments.js";
import mongoose from "mongoose";
import globalError from "./src/lib/globalError.js";
import session from "express-session";



const app = express();
const PORT = process.env.APP_PORT;
const DB_URL = process.env.DB_URL;
const SES_SECRET = process.env.SES_SECRET;
const oneDay = 1000 * 60 * 60 * 24;

app.use(session({
  secret: SES_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: oneDay }
}))

app.use(express.json());
app.use("/auth", authRouter);
app.use("/moments", momentRouter);
app.use(globalError);

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((result) => {
  app.listen(PORT, () => {
    console.log(`App running on ${PORT}`)
  });
}).catch((error) => {
  console.log(error);
});











