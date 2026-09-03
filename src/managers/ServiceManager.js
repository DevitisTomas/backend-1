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

        const serviceId = Number(id);

        const service = services.find(
            (service) => service.id === serviceId
        );

        return service || null;
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

        // Validación de todos los campos
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
            throw new Error("Todos los campos son obligatorios y deben tener un formato válido.");
        }

        const services = await this.getServices();

        const newId =
            services.length > 0
                ? Math.max(...services.map((service) => service.id)) + 1
                : 1;

        const newService = {
            id: newId,
            name: name.trim(),
            description: description.trim(),
            duration,
            price,
            category: category.trim(),
            available
        };

        services.push(newService);

        await this.saveServices(services);

        return newService;
    }

    async updateService(id, updatedData) {
        const services = await this.getServices();

        const serviceId = Number(id);

        const index = services.findIndex(
            (service) => service.id === serviceId
        );

        if (index === -1) {
            return null;
        }

        // El ID no se puede modificar
        const { id: ignoredId, ...dataWithoutId } = updatedData;

        services[index] = {
            ...services[index],
            ...dataWithoutId,
            id: serviceId
        };

        await this.saveServices(services);

        return services[index];
    }

    async deleteService(id) {
        const services = await this.getServices();

        const serviceId = Number(id);

        const index = services.findIndex(
            (service) => service.id === serviceId
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