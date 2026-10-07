import ServicesService from "../services/services.service.js";

const servicesService = new ServicesService();

const getServices = async (req, res) => {

    const {
        category,
        available,
        page,
        limit,
        sortBy,
        order
    } = req.query;

    const result = await servicesService.getServices({
        category,
        available,
        page,
        limit,
        sortBy,
        order
    });

    res.status(200).json(result);
};

const getServiceById = async (req, res) => {

    const { sid } = req.params;

    const service = await servicesService.getServiceById(sid);

    if (!service) {
        return res.status(404).json({
            error: "Servicio no encontrado"
        });
    }

    res.status(200).json(service);
};

const createService = async (req, res) => {

    const newService = await servicesService.createService(req.body);

    const io = req.app.get("io");

    if (io) {
        const result = await servicesService.getServices();

        io.emit("servicesUpdated", result.services);
    }

    res.status(201).json(newService);
};

const updateService = async (req, res) => {

    const { sid } = req.params;

    const updatedService = await servicesService.updateService(
        sid,
        req.body
    );

    if (!updatedService) {
        return res.status(404).json({
            error: "Servicio no encontrado"
        });
    }

    const io = req.app.get("io");

    if (io) {
        const result = await servicesService.getServices();

        io.emit("servicesUpdated", result.services);
    }

    res.status(200).json(updatedService);
};

const deleteService = async (req, res) => {

    const { sid } = req.params;

    const deletedService = await servicesService.deleteService(sid);

    if (!deletedService) {
        return res.status(404).json({
            error: "Servicio no encontrado"
        });
    }

    const io = req.app.get("io");

    if (io) {
        const result = await servicesService.getServices();

        io.emit("servicesUpdated", result.services);
    }

    res.status(200).json(deletedService);
};

export {
    getServices,
    getServiceById,
    createService,
    updateService,
    deleteService
};