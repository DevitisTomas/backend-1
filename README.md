# Administrador de Servicios

## Descripción

Este proyecto consiste en un administrador de servicios desarrollado con Node.js utilizando módulos ECMAScript (ESM). Permite gestionar los servicios de un sistema de turnos y reservas mediante un archivo JSON como almacenamiento.

Cada servicio posee la siguiente estructura:

```json
{
  "id": 1,
  "name": "Corte de cabello",
  "description": "Corte clásico para caballero",
  "duration": 60,
  "price": 12000,
  "category": "Peluquería",
  "available": true
}
```

---

## Tecnologías utilizadas

- Node.js
- JavaScript (ESM)
- dotenv
- File System (fs/promises)

---

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/usuario/repositorio.git
```

Ingresar al proyecto:

```bash
cd backend-1
```

Instalar dependencias:

```bash
npm install
```

---

## Variables de entorno

Crear un archivo `.env` con el siguiente contenido:

```env
PORT=8080
NODE_ENV=development
```

---

## Ejecutar el proyecto

```bash
npm start
```

---

## Estructura del proyecto

```
src
│
├── config
│   └── env.config.js
│
├── data
│   └── services.json
│
├── managers
│   └── ServiceManager.js
│
└── app.js
```

---

## Métodos disponibles

### getServices()

Obtiene todos los servicios registrados.

---

### getServiceById(id)

Obtiene un servicio según su identificador.

---

### addService(serviceData)

Agrega un nuevo servicio.

El identificador se genera automáticamente.

---

### updateService(id, updatedData)

Actualiza un servicio existente.

No permite modificar el id.

---

### deleteService(id)

Elimina un servicio existente.

---

## Autor

Proyecto desarrollado para la preentrega del curso **Backend I: Desarrollo Avanzado de Backend**.