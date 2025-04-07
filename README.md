# Todo-list application

## Technology

### Frontend

1. React
2. NextJS
3. MUI

### Backend

1. Language: Typescript
2. DB: PostgreSQL, ORM Prisma
3. Unit test, Endpoint test: Jest (TODO, cuz im lazy af)
4. CI/CD: Github action (TODO)
5. NestJS for APIs
6. OpenAPI

## Command

### For API (`root` -> `cd api`)

You'll need to run docker, make sure Docker Destop was installed (for Windows)
```bash
docker compose up -d
```

1. `dev`: Runs the application in development mode using the environment variables from `.env.dev`.
    ```bash
    yarn dev
    ```

2. `prisma:dev`: Runs the Prisma migrations in development mode.
    ```bash
    yarn prisma:dev
    ```

3. `prisma:clear`: Resets the Prisma migrations.
    ```bash
    yarn prisma:clear
    ```

4. `prisma:seed`: Seeds the database using the seed script.
    ```bash
    yarn prisma:seed
    ```

6. `start:watch`: Starts the NestJS application in watch mode with debugging enabled.
    ```bash
    yarn start:watch
    ```

### For Frontend (`root` -> `cd app/src`)

1. **`dev`**: Runs the application in development mode using the environment variables from `.env.dev`.
    ```bash
    yarn dev
    ```

2. **`start:dev`**: Starts the development server on port `8080`.
    ```bash
    yarn start:dev
    ```

3. **`start:build`**: Builds the application for production.
    ```bash
    yarn start:build
    ```

4. **`start:static-build`**: Starts the production server on port `8080` after building the application.
    ```bash
    yarn start:static-build
    ```

## Ports

1. API: `http://localhost:3000/hello`
2. API Docs: `http://localhost:3000/api-docs`
3. App: `http://localhost:8080`

