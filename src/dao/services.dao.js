import fs from "fs/promises";
import path from "path";

class ServicesDAO {
    constructor() {
        this.path = path.resolve("src/data/services.json");
    }

    async getAll() {
        const data = await fs.readFile(this.path, "utf-8");
        return JSON.parse(data);
    }

    async getById(id) {
        const services = await this.getAll();

        return services.find(
            (service) => service.id === Number(id)
        ) || null;
    }

    async create(service) {
        const services = await this.getAll();

        services.push(service);

        await fs.writeFile(
            this.path,
            JSON.stringify(services, null, 2)
        );

        return service;
    }

    async update(id, serviceData) {
        const services = await this.getAll();

        const serviceId = Number(id);

        const index = services.findIndex(
            (service) => service.id === serviceId
        );

        if (index === -1) {
            return null;
        }

        services[index] = {
            ...services[index],
            ...serviceData,
            id: serviceId
        };

        await fs.writeFile(
            this.path,
            JSON.stringify(services, null, 2)
        );

        return services[index];
    }

    async delete(id) {
        const services = await this.getAll();

        const serviceId = Number(id);

        const index = services.findIndex(
            (service) => service.id === serviceId
        );

        if (index === -1) {
            return null;
        }

        const deletedService = services[index];

        services.splice(index, 1);

        await fs.writeFile(
            this.path,
            JSON.stringify(services, null, 2)
        );

        return deletedService;
    }
}

export default ServicesDAO;