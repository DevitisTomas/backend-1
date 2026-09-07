import { Router } from "express";

import {
    createBooking,
    getBookingById,
    addServiceToBooking
} from "../controllers/bookings.controller.js";

import validate from "../validators/validate.js";
import bookingSchema from "../validators/booking.validator.js";
import bookingServiceSchema from "../validators/bookingService.validator.js";

const router = Router();

router.post(
    "/",
    validate(bookingSchema),
    createBooking
);

router.get("/:bid", getBookingById);

router.post(
    "/:bid/services/:sid",
    validate(bookingServiceSchema),
    addServiceToBooking
);

export default router;