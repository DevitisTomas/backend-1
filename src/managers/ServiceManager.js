import fs from "fs/promises";
import path from "path";

class ServiceManager {
    constructor() {
        this.path = path.resolve("src/data/services.json");
    }

    async getServices() {
        const data = await fs.readFile(this.path, "utf-8");
        return JSON.parse(data);
    }

    async getServiceById(id) {
        const services = await this.getServices();

        const service = services.find((service) => service.id === id);

        if (!service) {
            return null;
        }

        return service;
    }

    async saveServices(services) {
        await fs.writeFile(
            this.path,
            JSON.stringify(services, null, 2)
        );
    }

    async addService(serviceData) {
        const {
            name,
            description,
            duration,
            price,
            category,
            available
        } = serviceData;

        if (
            !name ||
            !description ||
            !duration ||
            !price ||
            !category ||
            available === undefined
        ) {
            throw new Error("Todos los campos son obligatorios.");
        }

        const services = await this.getServices();

        const newId =
            services.length > 0
                ? services[services.length - 1].id + 1
                : 1;

        const newService = {
            id: newId,
            name,
            description,
            duration,
            price,
            category,
            available
        };

        services.push(newService);

        await this.saveServices(services);

        return newService;
    }

    async updateService(id, updatedData) {
        const services = await this.getServices();

        const index = services.findIndex(
            (service) => service.id === id
        );

        if (index === -1) {
            return null;
        }

        delete updatedData.id;

        services[index] = {
            ...services[index],
            ...updatedData
        };

        await this.saveServices(services);

        return services[index];
    }

    async deleteService(id) {
        const services = await this.getServices();

        const index = services.findIndex(
            (service) => service.id === id
        );

        if (index === -1) {
            return null;
        }

        const deletedService = services[index];

        services.splice(index, 1);

        await this.saveServices(services);

        return deletedService;
    }
}

export default ServiceManager;