# Administrador de Servicios y Reservas

API REST desarrollada con Node.js, Express y Mongoose para administrar servicios y reservas de un sistema de turnos.

La aplicación utiliza MongoDB Atlas como medio de persistencia y una arquitectura en capas para separar las responsabilidades de cada parte del sistema.

## Instalación

Clonar el repositorio:

~~~bash
git clone https://github.com/DevitisTomas/backend-1.git
~~~

Instalar las dependencias:

~~~bash
npm install
~~~

Iniciar el servidor:

~~~bash
npm start
~~~

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

~~~env
PORT=8080
NODE_ENV=development
MONGO_URI=tu_uri_de_mongodb
~~~

El archivo `.env` no debe subirse al repositorio.

También se incluye un archivo `.env.example` como referencia.

## Arquitectura

El proyecto utiliza una arquitectura en capas con el siguiente flujo:

~~~text
Router
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
DAO
   ↓
Mongoose
   ↓
MongoDB Atlas
~~~

### Router

Define las rutas de la API y las conecta con los controllers correspondientes.

### Controller

Recibe las peticiones HTTP, obtiene los datos de `req.params`, `req.query` y `req.body`, llama a los services y devuelve las respuestas HTTP.

### Service

Contiene la lógica de negocio de la aplicación.

### Repository

Se encarga de comunicarse con el DAO y abstraer el acceso a los datos.

### DAO

Utiliza los modelos de Mongoose para realizar las operaciones de persistencia en MongoDB.

### Models

Definen los esquemas utilizados por Mongoose para los servicios, reservas y mensajes.

## Estructura del proyecto

~~~text
backend-1/
├── src/
│   ├── config/
│   │   ├── database.config.js
│   │   └── env.config.js
│   │
│   ├── controllers/
│   │   ├── bookings.controller.js
│   │   └── services.controller.js
│   │
│   ├── dao/
│   │   ├── bookings.dao.js
│   │   └── services.dao.js
│   │
│   ├── models/
│   │   ├── booking.model.js
│   │   ├── message.model.js
│   │   └── service.model.js
│   │
│   ├── repositories/
│   │   ├── bookings.repository.js
│   │   └── services.repository.js
│   │
│   ├── routes/
│   │   ├── bookings.router.js
│   │   └── services.router.js
│   │
│   ├── services/
│   │   ├── bookings.service.js
│   │   └── services.service.js
│   │
│   └── app.js
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
~~~

## Servicios

### Obtener todos los servicios

~~~http
GET /api/services
~~~

Permite obtener todos los servicios registrados.

También se pueden utilizar filtros mediante query parameters:

~~~http
GET /api/services?category=salud
~~~

~~~http
GET /api/services?available=true
~~~

### Obtener un servicio por ID

~~~http
GET /api/services/:sid
~~~

### Crear un servicio

~~~http
POST /api/services
~~~

Ejemplo de body:

~~~json
{
  "name": "Corte de cabello",
  "description": "Corte clásico para caballero",
  "duration": 60,
  "price": 12000,
  "category": "Peluquería",
  "available": true
}
~~~

El identificador es generado automáticamente por MongoDB.

### Actualizar un servicio

~~~http
PUT /api/services/:sid
~~~

Ejemplo:

~~~json
{
  "name": "Corte de cabello actualizado",
  "description": "Corte clásico actualizado",
  "duration": 60,
  "price": 14000,
  "category": "Peluquería",
  "available": true
}
~~~

### Eliminar un servicio

~~~http
DELETE /api/services/:sid
~~~

## Reservas

### Crear una reserva

~~~http
POST /api/bookings
~~~

Ejemplo de body:

~~~json
{
  "clientName": "Tomas",
  "clientEmail": "tomas@gmail.com",
  "date": "2026-09-10",
  "time": "10:00",
  "status": "pending",
  "services": []
}
~~~

### Obtener una reserva

~~~http
GET /api/bookings/:bid
~~~

### Agregar un servicio a una reserva

~~~http
POST /api/bookings/:bid/services/:sid
~~~

El servicio agregado se guarda dentro de la reserva mediante una referencia `ObjectId`.

Si el mismo servicio se agrega nuevamente, se incrementa su cantidad.

Ejemplo:

~~~json
{
  "services": [
    {
      "service": "ObjectId del servicio",
      "quantity": 2
    }
  ]
}
~~~

## Persistencia

La persistencia de la aplicación se realiza mediante MongoDB Atlas utilizando Mongoose.

Los datos de servicios y reservas ya no se almacenan en archivos JSON para las operaciones de la API.

Los modelos de Mongoose utilizados son:

- `Service`
- `Booking`
- `Message`

Las reservas utilizan referencias `ObjectId` para relacionar los servicios:

~~~text
Booking
 └── services
      ├── service → Service ObjectId
      └── quantity
~~~

## Tecnologías utilizadas

- Node.js
- Express
- Mongoose
- MongoDB Atlas
- JavaScript
- dotenv

## Repositorio

https://github.com/DevitisTomas/backend-1