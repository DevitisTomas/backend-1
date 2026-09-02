import express from "express";
import ServiceManager from "../managers/ServiceManager.js";

const router = express.Router();

const serviceManager = new ServiceManager();


// =====================================================
// GET /api/services
// Devuelve todos los servicios
// Acepta filtros por category y available
// =====================================================

router.get("/", async (req, res) => {
    try {
        let services = await serviceManager.getServices();

        const { category, available } = req.query;

        // Filtro por categoría
        if (category) {
            services = services.filter(
                (service) =>
                    service.category.toLowerCase() === category.toLowerCase()
            );
        }

        // Filtro por disponibilidad
        if (available !== undefined) {
            const availableValue = available === "true";

            services = services.filter(
                (service) => service.available === availableValue
            );
        }

        res.status(200).json(services);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Error al obtener los servicios"
        });
    }
});


// =====================================================
// GET /api/services/:sid
// Devuelve un servicio por id
// =====================================================

router.get("/:sid", async (req, res) => {
    try {
        const { sid } = req.params;

        const id = Number(sid);

        const service = await serviceManager.getServiceById(id);

        if (!service) {
            return res.status(404).json({
                error: "Servicio no encontrado"
            });
        }

        res.status(200).json(service);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Error al obtener el servicio"
        });
    }
});


// =====================================================
// POST /api/services
// Crea un nuevo servicio
// El id se genera automáticamente
// =====================================================

router.post("/", async (req, res) => {
    try {
        const serviceData = req.body;

        const newService = await serviceManager.addService(serviceData);

        res.status(201).json(newService);

    } catch (error) {
        console.error(error);

        res.status(400).json({
            error: error.message
        });
    }
});


// =====================================================
// PUT /api/services/:sid
// Actualiza un servicio
// No permite modificar el id
// =====================================================

router.put("/:sid", async (req, res) => {
    try {
        const { sid } = req.params;

        const id = Number(sid);

        const updatedData = req.body;

        // No permitimos modificar el id
        delete updatedData.id;

        const updatedService = await serviceManager.updateService(
            id,
            updatedData
        );

        if (!updatedService) {
            return res.status(404).json({
                error: "Servicio no encontrado"
            });
        }

        res.status(200).json(updatedService);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Error al actualizar el servicio"
        });
    }
});


// =====================================================
// DELETE /api/services/:sid
// Elimina un servicio
// =====================================================

router.delete("/:sid", async (req, res) => {
    try {
        const { sid } = req.params;

        const id = Number(sid);

        const deletedService = await serviceManager.deleteService(id);

        if (!deletedService) {
            return res.status(404).json({
                error: "Servicio no encontrado"
            });
        }

        res.status(200).json(deletedService);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Error al eliminar el servicio"
        });
    }
});


export default router;