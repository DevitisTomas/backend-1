import ServicesService from "../services/services.service.js";

const servicesService = new ServicesService();

const getServicesView = async (req, res) => {
    try {
        const services = await servicesService.getServices();

        res.render("services", {
            title: "Servicios",
            services
        });
    } catch (error) {
        console.error(error);

        res.status(500).send("Error al cargar los servicios");
    }
};

const getAvailabilityView = async (req, res) => {
    try {
        const services = await servicesService.getServices();

        res.render("availability", {
            title: "Disponibilidad",
            services
        });
    } catch (error) {
        console.error(error);

        res.status(500).send("Error al cargar la disponibilidad");
    }
};

export {
    getServicesView,
    getAvailabilityView
};