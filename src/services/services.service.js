import ServicesRepository from "../repositories/services.repository.js";

class ServicesService {

    constructor() {

        this.repository = new ServicesRepository();

    }

    async getServices(filters = {}) {

        let services = await this.repository.getAll();

        const { category, available } = filters;

        if (category) {

            services = services.filter(
                (service) =>
                    service.category.toLowerCase() === category.toLowerCase()
            );

        }

        if (available !== undefined) {

            const availableValue = available === "true";

            services = services.filter(
                (service) => service.available === availableValue
            );

        }

        return services;

    }

    async getServiceById(id) {

        return await this.repository.getById(id);

    }

    async createService(serviceData) {

        const {
            name,
            description,
            duration,
            price,
            category,
            available
        } = serviceData;

        if (
            typeof name !== "string" ||
            name.trim() === "" ||

            typeof description !== "string" ||
            description.trim() === "" ||

            duration === undefined ||
            duration === null ||

            price === undefined ||
            price === null ||

            typeof category !== "string" ||
            category.trim() === "" ||

            typeof available !== "boolean"
        ) {

            throw new Error(
                "Todos los campos son obligatorios y deben tener un formato válido."
            );

        }

        const newService = {

            name: name.trim(),

            description: description.trim(),

            duration,

            price,

            category: category.trim(),

            available

        };

        return await this.repository.create(newService);

    }

    async updateService(id, updatedData) {

        const service = await this.repository.getById(id);

        if (!service) {

            return null;

        }

        const { id: ignoredId, _id: ignoredMongoId, ...dataWithoutId } = updatedData;

        return await this.repository.update(
            id,
            dataWithoutId
        );

    }

    async deleteService(id) {

        const service = await this.repository.getById(id);

        if (!service) {

            return null;

        }

        return await this.repository.delete(id);

    }

}

export default ServicesService;