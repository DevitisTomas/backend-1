import express from "express";
import path from "path";
import { engine } from "express-handlebars";

import servicesRouter from "./routes/services.router.js";
import bookingsRouter from "./routes/bookings.router.js";
import viewsRouter from "./routes/views.router.js";

const app = express();

app.use(express.json());

app.engine(
    "handlebars",
    engine({
        defaultLayout: "main"
    })
);

app.set("view engine", "handlebars");
app.set("views", path.resolve("src/views"));

app.use(express.static(path.resolve("src/public")));

app.use("/api/services", servicesRouter);

app.use("/api/bookings", bookingsRouter);

app.use("/views", viewsRouter);

app.get("/", (req, res) => {
    res.json({
        message: "API de servicios funcionando correctamente"
    });
});

export default app;