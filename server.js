import app from "./src/app.js";
import env from "./src/config/env.config.js";

app.listen(env.PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${env.PORT}`);
});