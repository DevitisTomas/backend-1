import fs from "fs/promises";
import path from "path";

class BookingsDAO {
    constructor() {
        this.path = path.resolve("src/data/bookings.json");
    }

    async getAll() {
        const data = await fs.readFile(this.path, "utf-8");
        return JSON.parse(data);
    }

    async getById(id) {
        const bookings = await this.getAll();

        return bookings.find(
            (booking) => booking.id === Number(id)
        ) || null;
    }

    async create(booking) {
        const bookings = await this.getAll();

        bookings.push(booking);

        await fs.writeFile(
            this.path,
            JSON.stringify(bookings, null, 2)
        );

        return booking;
    }

    async update(id, bookingData) {
        const bookings = await this.getAll();

        const bookingId = Number(id);

        const index = bookings.findIndex(
            (booking) => booking.id === bookingId
        );

        if (index === -1) {
            return null;
        }

        bookings[index] = {
            ...bookings[index],
            ...bookingData,
            id: bookingId
        };

        await fs.writeFile(
            this.path,
            JSON.stringify(bookings, null, 2)
        );

        return bookings[index];
    }
}

export default BookingsDAO;