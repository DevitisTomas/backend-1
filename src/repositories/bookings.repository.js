import BookingsDAO from "../dao/bookings.dao.js";

class BookingsRepository {

    constructor() {

        this.dao = new BookingsDAO();

    }

    async create(booking) {

        return await this.dao.create(booking);

    }

    async getById(id) {

        return await this.dao.getById(id);

    }

    async update(id, bookingData) {

        return await this.dao.update(id, bookingData);

    }

}

export default BookingsRepository;