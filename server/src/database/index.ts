import mongoose from "mongoose";

mongoose.set("strictQuery", false);

mongoose.connect(
  "mongodb://docker:sharenergy@localhost:27017/desafiodb?authSource=admin"
);

export { mongoose };
