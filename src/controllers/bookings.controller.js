import BookingsService from "../services/bookings.service.js";

const bookingsService = new BookingsService();

// POST /api/bookings
const createBooking = async (req, res) => {

    try {

        const booking = await bookingsService.createBooking(req.body);

        res.status(201).json(booking);

    } catch (error) {

        console.error(error);

        res.status(400).json({
            error: error.message
        });

    }

};

// GET /api/bookings/:bid
const getBookingById = async (req, res) => {

    try {

        const { bid } = req.params;

        const booking = await bookingsService.getBookingById(bid);

        if (!booking) {

            return res.status(404).json({
                error: "Reserva no encontrada"
            });

        }

        res.status(200).json(booking);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error al obtener la reserva"
        });

    }

};

// POST /api/bookings/:bid/services/:sid
const addServiceToBooking = async (req, res) => {

    try {

        const { bid, sid } = req.params;

        const updatedBooking =
            await bookingsService.addServiceToBooking(bid, sid);

        if (!updatedBooking) {

            return res.status(404).json({
                error: "Reserva no encontrada"
            });

        }

        if (updatedBooking === "service_not_found") {

            return res.status(404).json({
                error: "Servicio no encontrado"
            });

        }

        res.status(200).json(updatedBooking);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error al agregar el servicio a la reserva"
        });

    }

};

export {
    createBooking,
    getBookingById,
    addServiceToBooking
};