import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://syedmuhammadzaid:gymfie140@cluster0.1tmd7ty.mongodb.net/food-delivery"
    )
    .then(() => {
      console.log("database connected");
    });
};
