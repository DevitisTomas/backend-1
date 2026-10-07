const errorMiddleware = (error, req, res, next) => {

    console.error(error);

    if (error.name === "CastError") {
        return res.status(400).json({
            error: "El ID proporcionado no es válido."
        });
    }

    const status = error.status || 500;

    res.status(status).json({
        error: error.message || "Error interno del servidor"
    });
};

export default errorMiddleware;