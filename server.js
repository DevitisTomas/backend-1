import app from "./src/app.js";
import env from "./src/config/env.config.js";
import connectDB from "./src/config/database.config.js";

const startServer = async () => {
    await connectDB();

    app.listen(env.PORT, () => {
        console.log(`Servidor funcionando en http://localhost:${env.PORT}`);
    });
};

startServer();