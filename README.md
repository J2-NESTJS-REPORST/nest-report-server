# Ejecutar en Dev

1. Clonar el repositorio
2. Instalar dependencias `npm install`
3. Clonar `env.template` y renombrar a `.env` y completar las variables de entorno en .env
4. Levantar la base de datos `docker compose up -d`
5. crear la base de datos `employesDB`
6. ejecutar el comando `npx prisma db pull` para traear el esquema a nest
7. Generar el Prisma client `npx prisma generate`
8. Ejecutar proyecto `npm run start:dev`
