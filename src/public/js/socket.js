const socket = io();

socket.on("servicesUpdated", (services) => {
    const servicesList = document.getElementById("services-list");

    if (!servicesList) {
        return;
    }

    servicesList.innerHTML = "";

    services.forEach((service) => {
        const article = document.createElement("article");

        article.classList.add("service");

        article.innerHTML = `
            <h3>${service.name}</h3>

            <p><strong>Descripción:</strong> ${service.description}</p>

            <p><strong>Duración:</strong> ${service.duration} minutos</p>

            <p><strong>Precio:</strong> $${service.price}</p>

            <p><strong>Categoría:</strong> ${service.category}</p>

            <p>
                <strong>Disponibilidad:</strong>
                ${service.available ? "Disponible" : "No disponible"}
            </p>
        `;

        servicesList.appendChild(article);
    });
});