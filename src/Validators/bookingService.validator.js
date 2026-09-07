import { z } from "zod";

const bookingServiceSchema = z.object({
    bid: z.string().min(1, "El ID de la reserva es obligatorio."),
    sid: z.string().min(1, "El ID del servicio es obligatorio.")
});

export default bookingServiceSchema;