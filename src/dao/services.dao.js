import Service from "../models/service.model.js";

class ServicesDAO {

    async getAll() {

        return await Service.find();

    }

    async getById(id) {

        return await Service.findById(id);

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