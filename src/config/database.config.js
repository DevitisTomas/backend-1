import mongoose from "mongoose";
import env from "./env.config.js";

const connectDB = async () => {
    try {
        await mongoose.connect(env.MONGO_URI);

        console.log("MongoDB conectado correctamente");
    } catch (error) {
        console.error("Error al conectar con MongoDB:", error.message);
        process.exit(1);
    }
};

export default connectDB;