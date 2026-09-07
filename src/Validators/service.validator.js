import { z } from "zod";

const serviceSchema = z.object({
    name: z.string().min(1, "El nombre es obligatorio."),
    description: z.string().min(1, "La descripción es obligatoria."),
    duration: z.number().positive("La duración debe ser mayor a 0."),
    price: z.number().nonnegative("El precio no puede ser negativo."),
    category: z.string().min(1, "La categoría es obligatoria."),
    available: z.boolean()
});

export default serviceSchema;