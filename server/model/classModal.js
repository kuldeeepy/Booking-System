import mongoose, { Schema } from "mongoose";

const classSchema = new Schema({
  classType: {
    type: String,
    enum: ["Yoga", "Gym", "Dance"],
    required: true,
  },
  capacity: {
    type: Number,
    default: 10,
  },
  startTime: {
    type: String,
  },
  endTime: {
    type: String,
  },
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  waitList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

classSchema.pre("save", async function (next) {
  // Splitting the startTime into time and (AM/PM)
  const [time, period] = this.startTime.split(" ");

  // Splitting the time into hours and minutes and converting them to numbers
  let [hour, minute] = time.split(":").map(Number);

  hour += 2; // Adding 2 hours

  if (hour > 12) {
    // If the hour is greater than 12
    hour -= 12; // Subtract 12 to convert to 12-hour format
  }

  if (hour === 0) {
    // If the hour becomes 0 (which means it was originally 10 PM, 11 PM, or 12 PM)
    hour = 12; // Set it to 12 (midnight or noon)
  }

  // Formatting the endTime
  this.endTime = `${hour}:${minute < 10 ? "0" + minute : minute} ${period}`;
  console.log(this.startTime, "||", this.endTime);
  next();
});

const Class = mongoose.model("Class", classSchema);

export { classSchema, Class };
