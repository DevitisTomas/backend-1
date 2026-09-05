# Administrador de Servicios y Reservas

## Descripción

Este proyecto consiste en una API REST desarrollada con Node.js y Express para gestionar servicios y reservas de un sistema de turnos.

La información se almacena en archivos JSON utilizando el módulo `fs/promises`, permitiendo mantener los datos aunque el servidor se reinicie.

El proyecto utiliza módulos ECMAScript (ESM).

---

## Tecnologías utilizadas

- Node.js
- Express
- JavaScript (ESM)
- dotenv
- File System (`fs/promises`)
- JSON

---

## Arquitectura

El proyecto utiliza una arquitectura en capas para separar las responsabilidades de cada parte de la API.

El flujo de una petición es:

Router → Controller → Service → Repository → DAO → JSON

### Router

Define las rutas y conecta cada endpoint con su controlador.

### Controller

Recibe las peticiones HTTP, obtiene los datos de `req.params`, `req.query` y `req.body`, llama a los servicios y devuelve las respuestas mediante `res`.

### Service

Contiene la lógica de negocio de la aplicación, como las validaciones y el incremento de `quantity` cuando se agrega un servicio repetido a una reserva.

### Repository

Se encarga de comunicarse con el DAO y proporciona los métodos necesarios para acceder a los datos.

### DAO

Es la capa encargada del acceso directo a los archivos JSON utilizando `fs/promises`. Se ocupa de leer y escribir los datos.

### Data

Contiene los archivos JSON utilizados para persistir la información:

- `services.json`
- `bookings.json`

---

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/DevitisTomas/backend-1.git