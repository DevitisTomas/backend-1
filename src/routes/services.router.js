import { Router } from "express";

import {
    getServices,
    getServiceById,
    createService,
    updateService,
    deleteService
} from "../controllers/services.controller.js";

import validate from "../Validators/validate.js";
import serviceSchema from "../Validators/service.validator.js";

const router = Router();

router.get("/", getServices);
router.get("/:sid", getServiceById);
router.post("/", validate(serviceSchema), createService);
router.put("/:sid", validate(serviceSchema), updateService);
router.delete("/:sid", deleteService);

export default router;