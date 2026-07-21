# Rentify

Rentify es una aplicacion web colaborativa para publicar, buscar y gestionar propiedades en alquiler. El proyecto fue desarrollado como una experiencia de trabajo en equipo, con frontend, backend, UX/UI y gestion de proyecto separados por responsabilidades.

## Demo y enlaces

- Frontend desplegado: [Rentify](https://rentify-eta-henna.vercel.app)
- Swagger backend: [API Docs](https://rentify-4x9t.onrender.com/swagger-ui/index.html)
- Repositorio: [EdgarCamberos1894/Rentify](https://github.com/EdgarCamberos1894/Rentify)
- Repositorio colaborativo original: [No-Country-simulation/S18-23-n-java-react](https://github.com/No-Country-simulation/S18-23-n-java-react)

## Contexto del proyecto

Este fue uno de mis primeros proyectos colaborativos fullstack. No fue un proyecto individual: el frontend, backend, diseno y gestion fueron trabajados por distintos integrantes del equipo.

Mi participacion estuvo enfocada principalmente en backend, configuracion, soporte para despliegue y mejoras posteriores de integracion. Lo presento en mi portafolio como una muestra de trabajo colaborativo, integracion con otros equipos y mantenimiento de un producto ya existente.

## Mi contribucion

Con base en el historial del repositorio, mis aportes principales se concentraron en:

- Configuracion inicial del backend con Spring Boot.
- Configuracion de Docker para el servicio backend.
- Configuracion de CORS y ajustes para permitir comunicacion con el frontend.
- Configuracion de Swagger/OpenAPI.
- Migraciones de base de datos y datos de prueba con Flyway.
- Correcciones en nombres y estructura de migraciones.
- Soporte para rol `INMOBILIARIA` y campo `username` en perfiles.
- Ajustes en respuestas de usuario y perfil, incluyendo datos necesarios para el frontend.
- Configuracion por variables de entorno para facilitar despliegues.
- Integracion posterior de Resend para correos transaccionales.
- Mejoras posteriores en flujos de verificacion de email y recuperacion de contrasena.
- Documentacion tecnica y ajustes de despliegue.

No fui responsable del desarrollo completo de autenticacion ni del frontend completo. El objetivo de esta version es documentar de forma clara y honesta mi participacion dentro del equipo.

## Funcionalidades principales

- Registro de usuarios.
- Login con JWT.
- Verificacion de cuenta por correo.
- Reenvio de correo de verificacion.
- Recuperacion y reseteo de contrasena.
- Roles de usuario e inmobiliaria.
- Exploracion de propiedades.
- Detalle de propiedad.
- Registro y modificacion de propiedades.
- Filtros por ubicacion, tipo de propiedad, habitaciones, amenities y features.
- Gestion de perfil.
- Documentacion de API con Swagger.

## Tecnologias

### Frontend

- React
- TypeScript
- Vite
- Material UI
- React Hook Form
- Axios
- Leaflet / React Leaflet

### Backend

- Java 17
- Spring Boot
- Spring Security
- JWT
- Spring Data JPA
- Flyway
- MySQL / PostgreSQL
- Swagger / OpenAPI
- Resend
- Docker

## Estructura del repositorio

```text
backend/
  rentify/        Backend Spring Boot

frontend/
  rentify/        Frontend React + Vite
```

## Variables de entorno

El proyecto usa variables de entorno para separar configuracion local y produccion.

Backend:

```env
DATABASE=jdbc:postgresql://localhost:5432/database
DB_USER=user
DB_PASSWORD=password
DATABASE_TYPE=postgresql

RESEND_APIKEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_EMAIL=rentyfy@cambers.lat
RESEND_NAME=Rentify

FRONT_BASE_URL=http://localhost:3000
VERIFYEMAIL_URL=/auth/verify-email
RESETPASSWORD_URL=/auth/reset-password

JWT_EXPIRATION=86400000
JWT_SECRETKEY=base64-secret
CORS_ALLOWED=http://localhost:*
```

Frontend:

```env
VITE_API_URL=http://localhost:8080/api/v1
VITE_CLOUDINARY_CLOUD_NAME=cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=upload_preset
VITE_CLOUDINARY_FOLDER=folder
```

## Como correr el proyecto

### Backend

```bash
cd backend/rentify
./mvnw spring-boot:run
```

En Windows:

```powershell
cd backend\rentify
.\mvnw.cmd spring-boot:run
```

### Frontend

```bash
cd frontend/rentify
npm install
npm run dev
```

Por defecto, Vite levanta el frontend en:

```text
http://localhost:3000
```

## Comandos utiles

Backend:

```bash
./mvnw test
./mvnw -DskipTests compile
```

Frontend:

```bash
npm run build
npm run lint
```

## Notas para portafolio

Este proyecto muestra experiencia trabajando con un equipo multidisciplinario, integrando frontend y backend, resolviendo problemas de despliegue y ajustando una aplicacion real con multiples capas.

Mi enfoque al presentarlo es backend e integracion, no autoria completa del producto.
