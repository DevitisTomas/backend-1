import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = ["PORT", "NODE_ENV"];

requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
        throw new Error(`La variable de entorno ${envVar} es obligatoria.`);
    }
});

export default {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
};