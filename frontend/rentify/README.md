# Rentify Frontend

Frontend de Rentify construido con React, TypeScript, Vite y Material UI. Consume la API del backend para registro, login, verificacion de cuenta, recuperacion de contrasena, exploracion de propiedades y gestion de publicaciones.

## Contexto

Este frontend fue desarrollado por el equipo de frontend dentro del proyecto colaborativo. En esta version se documenta su ejecucion y configuracion para facilitar la revision desde portafolio.

## Tecnologias

- React
- TypeScript
- Vite
- Material UI
- React Router
- React Hook Form
- Axios
- Leaflet / React Leaflet

## Variables de entorno

Crea un archivo `.env` local tomando como base `.env.example`.

```env
VITE_API_URL=http://localhost:8080/api/v1

VITE_CLOUDINARY_CLOUD_NAME=cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=upload_preset
VITE_CLOUDINARY_FOLDER=folder
```

Notas:

- `VITE_API_URL` debe apuntar al backend.
- Las variables de Cloudinary se usan para la carga de imagenes.

## Ejecucion local

```bash
npm install
npm run dev
```

Por configuracion de Vite, el frontend corre en:

```text
http://localhost:3000
```

## Build de produccion

```bash
npm run build
```

## Preview local del build

```bash
npm run preview
```

## Scripts disponibles

```json
{
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "preview": "vite preview"
}
```

## Rutas principales

- `/`
- `/login`
- `/register`
- `/explore`
- `/property/:propertyId`
- `/profile`
- `/register-property`
- `/modify-property/:propertyId`
- `/auth/verify-email`
- `/auth/reset-password`

## Nota de autoria

El frontend fue una responsabilidad del equipo de frontend. Los cambios posteriores documentados en este fork estan orientados a integracion, configuracion y soporte de flujos necesarios para que el proyecto pueda mostrarse correctamente en portafolio.
