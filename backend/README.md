# Rentify Backend

Backend de Rentify construido con Java 17 y Spring Boot. Expone una API REST para autenticacion, usuarios, perfiles, roles, propiedades, habitaciones, amenities, features y flujos de correo transaccional.

## Responsabilidad del backend

- Gestion de usuarios y perfiles.
- Roles de usuario, inmobiliaria y administrador.
- Autenticacion con JWT.
- Verificacion de cuenta por correo.
- Recuperacion y reseteo de contrasena.
- Gestion de propiedades y relaciones con habitaciones, multimedia, amenities y features.
- Migraciones de base de datos con Flyway.
- Documentacion de API con Swagger/OpenAPI.
- Envio de correos mediante Resend.

## Tecnologias

- Java 17
- Spring Boot
- Spring Security
- Spring Data JPA
- JWT
- Flyway
- MySQL / PostgreSQL
- Thymeleaf para templates de email
- Resend para email transaccional
- Swagger / OpenAPI
- Docker

## Variables de entorno

Crea un archivo `.env` local tomando como base `backend/rentify/.env.example`.

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

Notas:

- `DATABASE_TYPE` define la carpeta de migraciones usada por Flyway: `mysql` o `postgresql`.
- `FRONT_BASE_URL` debe apuntar al frontend real en produccion para que los enlaces de email funcionen.
- `RESEND_APIKEY` no debe commitearse.

## Ejecucion local

Desde la raiz del repositorio:

```bash
cd backend/rentify
./mvnw spring-boot:run
```

En Windows:

```powershell
cd backend\rentify
.\mvnw.cmd spring-boot:run
```

## Compilacion

```bash
./mvnw -DskipTests compile
```

En Windows:

```powershell
.\mvnw.cmd -DskipTests compile
```

## Swagger

Con el backend levantado localmente:

```text
http://localhost:8080/swagger-ui/index.html
```

En despliegue:

```text
https://s18-23-n-java-react.onrender.com/swagger-ui/index.html
```

## Endpoints relevantes

Base path:

```text
/api/v1
```

Autenticacion:

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/verify-email`
- `POST /auth/resend-verification-email`
- `POST /auth/recovery-password`
- `POST /auth/reset-password`
- `POST /auth/logout`

Propiedades:

- `GET /properties`
- `GET /properties/{id}`
- `POST /properties`
- `PUT /properties/{id}`
- `DELETE /properties/{id}`

## Notas de autoria

Este backend fue desarrollado de forma colaborativa. Mi participacion se centro en configuracion inicial, soporte de despliegue, migraciones, roles/perfiles, ajustes de respuestas para integracion con frontend y mejoras posteriores relacionadas con correo transaccional y variables de entorno.
