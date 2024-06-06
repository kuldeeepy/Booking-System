import mongoose from "mongoose";
const url = process.env.MONGO_URL;

const connectDB = () => {
  mongoose
    .connect(url)
    .then(() => {
      console.log(`DB Connected`);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default connectDB;
