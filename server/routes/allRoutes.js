import express from "express";
import { book, cancel, getBooking } from "../controller/classController.js";
const router = express.Router();

router.post("/booking", book);
router.post("/cancel/:bookingId", cancel);
router.get("/bookings/:uname", getBooking);

export default router;
