import Service from "../models/service.model.js";

class ServicesDAO {

    async getAll({
        category,
        available,
        skip,
        limit,
        sortBy,
        order
    }) {

        const filter = {};

        if (category) {
            filter.category = {
                $regex: category,
                $options: "i"
            };
        }

        if (available !== undefined) {
            filter.available = available;
        }

        const sort = {};

        if (sortBy) {
            sort[sortBy] = order === "desc" ? -1 : 1;
        }

        const services = await Service.find(filter)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .lean();

        const total = await Service.countDocuments(filter);

        return {
            services,
            total
        };
    }

    async getById(id) {
        return await Service.findById(id).lean();
    }

    async create(service) {
        return await Service.create(service);
    }

    async update(id, serviceData) {
        return await Service.findByIdAndUpdate(
            id,
            serviceData,
            {
                new: true,
                runValidators: true
            }
        );
    }

    async delete(id) {
        return await Service.findByIdAndDelete(id);
    }
}

export default ServicesDAO;