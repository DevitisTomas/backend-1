import "./config/env.config.js";
import ServiceManager from "./managers/ServiceManager.js";

const manager = new ServiceManager();

try {
    console.log("=== Agregando servicio ===");

    const service = await manager.addService({
        name: "Corte de cabello",
        description: "Corte clásico para caballero",
        duration: 60,
        price: 12000,
        category: "Peluquería",
        available: true
    });

    console.log(service);

    console.log("\n=== Todos los servicios ===");
    console.log(await manager.getServices());

    console.log("\n=== Buscar servicio por ID ===");
    console.log(await manager.getServiceById(1));

    console.log("\n=== Actualizando servicio ===");
    console.log(
        await manager.updateService(1, {
            price: 15000,
            duration: 75
        })
    );

    console.log("\n=== Eliminando servicio ===");
    console.log(await manager.deleteService(1));

    console.log("\n=== Servicios restantes ===");
    console.log(await manager.getServices());

} catch (error) {
    console.error(error.message);
}