import { z } from "zod";

const bookingSchema = z.object({
    clientName: z.string().min(1, "El nombre del cliente es obligatorio."),
    clientEmail: z.string().email("El email no es válido."),
    date: z.string().min(1, "La fecha es obligatoria."),
    time: z.string().min(1, "La hora es obligatoria."),
    status: z.string().min(1, "El estado es obligatorio."),
    services: z.array().optional()
});

export default bookingSchema;