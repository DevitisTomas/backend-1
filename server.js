import http from "http";
import { Server } from "socket.io";

import app from "./src/app.js";
import env from "./src/config/env.config.js";
import connectDB from "./src/config/database.config.js";

const startServer = async () => {
    await connectDB();

    const httpServer = http.createServer(app);

    const io = new Server(httpServer);

    io.on("connection", (socket) => {
        console.log("Cliente conectado a Socket.io");

        socket.on("disconnect", () => {
            console.log("Cliente desconectado de Socket.io");
        });
    });

    app.set("io", io);

    httpServer.listen(env.PORT, () => {
        console.log(`Servidor funcionando en http://localhost:${env.PORT}`);
    });
};

startServer();