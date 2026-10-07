import mongoose from "mongoose";

import ServicesRepository from "../repositories/services.repository.js";

class ServicesService {

    constructor() {
        this.repository = new ServicesRepository();
    }

    async getServices(filters = {}) {

        const {
            category,
            available,
            page = 1,
            limit = 10,
            sortBy,
            order
        } = filters;

        const currentPage = Math.max(Number(page) || 1, 1);
        const currentLimit = Math.max(Number(limit) || 10, 1);

        const skip = (currentPage - 1) * currentLimit;

        const availableValue =
            available === undefined
                ? undefined
                : available === "true";

        const result = await this.repository.getAll({
            category,
            available: availableValue,
            skip,
            limit: currentLimit,
            sortBy,
            order
        });

        const totalPages = Math.ceil(
            result.total / currentLimit
        );

        return {
            services: result.services,
            total: result.total,
            page: currentPage,
            limit: currentLimit,
            totalPages
        };
    }

    async getServiceById(id) {

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return null;
        }

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

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return null;
        }

        const service = await this.repository.getById(id);

        if (!service) {
            return null;
        }

        const {
            id: ignoredId,
            _id: ignoredMongoId,
            ...dataWithoutId
        } = updatedData;

        return await this.repository.update(
            id,
            dataWithoutId
        );
    }

    async deleteService(id) {

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return null;
        }

        const service = await this.repository.getById(id);

        if (!service) {
            return null;
        }

        return await this.repository.delete(id);
    }
}

export default ServicesService;