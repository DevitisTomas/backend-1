import ServiceManager from "../managers/ServiceManager.js";

const serviceManager = new ServiceManager();

// GET /api/services
const getServices = async (req, res) => {
    try {
        let services = await serviceManager.getServices();

        const { category, available } = req.query;

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

        res.status(200).json(services);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Error al obtener los servicios"
        });
    }
};

// GET /api/services/:sid
const getServiceById = async (req, res) => {
    try {
        const { sid } = req.params;

        const service = await serviceManager.getServiceById(sid);

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
};

// POST /api/services
const createService = async (req, res) => {
    try {
        const newService = await serviceManager.addService(req.body);

        res.status(201).json(newService);
    } catch (error) {
        console.error(error);

        res.status(400).json({
            error: error.message
        });
    }
};

// PUT /api/services/:sid
const updateService = async (req, res) => {
    try {
        const { sid } = req.params;

        const updatedData = req.body;

        delete updatedData.id;

        const updatedService = await serviceManager.updateService(
            sid,
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
};

// DELETE /api/services/:sid
const deleteService = async (req, res) => {
    try {
        const { sid } = req.params;

        const deletedService = await serviceManager.deleteService(sid);

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
};

export {
    getServices,
    getServiceById,
    createService,
    updateService,
    deleteService
};