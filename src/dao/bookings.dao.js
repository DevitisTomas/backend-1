import Booking from "../models/booking.model.js";

class BookingsDAO {

    async create(booking) {

        return await Booking.create(booking);

    }

    async getById(id) {

        return await Booking.findById(id);

    }

    async update(id, bookingData) {

        return await Booking.findByIdAndUpdate(
            id,
            bookingData,
            {
                new: true,
                runValidators: true
            }
        );

    }

}

export default BookingsDAO;