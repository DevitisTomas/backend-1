import BookingsRepository from "../repositories/bookings.repository.js";

import ServicesRepository from "../repositories/services.repository.js";

class BookingsService {

    constructor() {

        this.repository = new BookingsRepository();

        this.servicesRepository = new ServicesRepository();

    }

    async createBooking(bookingData) {

        const bookings = await this.getAllBookings();

        const newId =
            bookings.length > 0
                ? Math.max(...bookings.map((booking) => booking.id)) + 1
                : 1;

        const newBooking = {
            id: newId,
            ...bookingData,
            services: bookingData.services || []
        };

        return await this.repository.create(newBooking);
    }

    async getAllBookings() {

        return await this.repository.getAll();

    }

    async getBookingById(id) {

        return await this.repository.getById(id);

    }

    async addServiceToBooking(bookingId, serviceId) {

        const booking = await this.repository.getById(bookingId);

        if (!booking) {

            return null;

        }

        const service = await this.servicesRepository.getById(serviceId);

        if (!service) {

            return "service_not_found";

        }

        const existingService = booking.services.find(
            (item) => item.service === Number(serviceId)
        );

        if (existingService) {

            existingService.quantity += 1;

        } else {

            booking.services.push({
                service: Number(serviceId),
                quantity: 1
            });

        }

        return await this.repository.update(
            bookingId,
            booking
        );
    }

}

export default BookingsService;