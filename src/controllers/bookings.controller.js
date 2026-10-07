import BookingsService from "../services/bookings.service.js";

const bookingsService = new BookingsService();

const createBooking = async (req, res) => {

    const booking = await bookingsService.createBooking(req.body);

    res.status(201).json(booking);
};

const getBookingById = async (req, res) => {

    const { bid } = req.params;

    const booking = await bookingsService.getBookingById(bid);

    if (!booking) {
        return res.status(404).json({
            error: "Reserva no encontrada"
        });
    }

    res.status(200).json(booking);
};

const addServiceToBooking = async (req, res) => {

    const { bid, sid } = req.params;

    const updatedBooking =
        await bookingsService.addServiceToBooking(bid, sid);

    if (!updatedBooking) {
        return res.status(404).json({
            error: "Reserva no encontrada"
        });
    }

    res.status(200).json(updatedBooking);
};

export {
    createBooking,
    getBookingById,
    addServiceToBooking
};