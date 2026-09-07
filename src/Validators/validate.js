const validate = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse({
            ...req.body,
            ...req.params
        });

        if (!result.success) {
            return res.status(400).json({
                error: "Datos inválidos",
                details: result.error.issues.map((issue) => issue.message)
            });
        }

        next();
    };
};

export default validate;