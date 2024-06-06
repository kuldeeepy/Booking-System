import { Class } from "../model/classModal.js";
import { User } from "../model/userModal.js";

const book = async (req, res, next) => {
  let { classType, slot, uname } = req.body;
  try {
    let user = await User.findOne({ name: uname });
    if (!user) {
      user = new User({ name: uname });
      await user.save();
    }
    const existingClass = await Class.findOne({ classType });

    if (!existingClass) {
      const newClass = new Class({
        classType: classType,
        startTime: slot,
      });
      newClass.bookings.push(user._id);
      user.bookedClasses.push(newClass);
      await newClass.save();
      await user.save();
      return res.status(200).json({ message: "Booking successful" });
    }

    if (existingClass.bookings.length < existingClass.capacity) {
      existingClass.bookings.push(user._id);
      await existingClass.save();
      return res.status(200).json({ message: "Booking successful" });
    } else {
      existingClass.waitList.push(user._id);
      await existingClass.save();
      return res.status(200).json({ message: "Added to waiting list" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const cancel = async (req, res, next) => {
  try {
    const { classType, bookingId } = req.body;
    const cancelledClass = await Class.findOne({
      bookedClasses: bookingId,
    });
    if (!cancelledClass) {
      return res.status(404).json({ error: "No class found" });
    }

    // Check if cancellation is within 30 mins before class starts
    const currentTime = new Date().getTime();
    const classStartTime = new Date(cancelledClass.startTime);
    const timeDiff = classStartTime - currentTime;
    const minutesDiff = Math.floor(timeDiff / (1000 * 60));
    if (minutesDiff > 30) {
      return res
        .status(400)
        .json({ error: "Cannot cancel within 30 mins of class start" });
    }
    // Remove user from bookings
    cancelledClass.bookings.splice(1);
    // Check if there are users in the waiting list
    if (cancelledClass.waitList.length > 0) {
      const firstWaitListUser = cancelledClass.waitList.shift();
      cancelledClass.bookings.push(firstWaitListUser);
    }
    await cancelledClass.save();
    return res.status(200).json({ message: "Cancellation successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const getBooking = async (req, res, next) => {
  let { uname } = req.params;
  try {
    let user = await User.findOne({ name: uname.toLowerCase() }).populate(
      "bookedClasses"
    );
    if (!user) return res.status(404).send("No Booking Found");

    // let bookings = await Class.find({
    //   _id: { $in: user.bookedClasses },
    // });

    res.status(200).send(user);
  } catch (e) {
    console.error(e);
  }
};

export { book, cancel, getBooking };
