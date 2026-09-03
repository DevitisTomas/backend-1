import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const bookingsPath = path.join(__dirname, "../data/bookings.json");

class BookingManager {
    async readBookings() {
        const data = await fs.readFile(bookingsPath, "utf-8");
        return JSON.parse(data);
    }

    async writeBookings(bookings) {
        await fs.writeFile(
            bookingsPath,
            JSON.stringify(bookings, null, 2)
        );
    }

    async createBooking(bookingData) {
        const bookings = await this.readBookings();

        const newId =
            bookings.length > 0
                ? Math.max(...bookings.map((booking) => booking.id)) + 1
                : 1;

        const newBooking = {
            id: newId,
            ...bookingData,
            services: bookingData.services || []
        };

        bookings.push(newBooking);

        await this.writeBookings(bookings);

        return newBooking;
    }

    async getBookingById(id) {
        const bookings = await this.readBookings();

        return bookings.find(
            (booking) => booking.id === Number(id)
        );
    }

    async addServiceToBooking(bookingId, serviceId) {
        const bookings = await this.readBookings();

        const booking = bookings.find(
            (booking) => booking.id === Number(bookingId)
        );

        if (!booking) {
            return null;
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

        await this.writeBookings(bookings);

        return booking;
    }
}

export default BookingManager;