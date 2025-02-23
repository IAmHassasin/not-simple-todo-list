# Todo-list application

## Technology

### Frontend

1. React

### Backend

1. Language: Typescript
2. DB: PostgreSQL, ORM Prisma
3. CI/CD: Github Action
4. Unit test, Endpoint test: Jest
5. NestJS App
6. OpenAPI

### Command

1. `dev`: Runs the application in development mode using the environment variables from `.env.dev`.
    ```bash
    yarn dev
    ```

2. `prisma:dev`: Runs the Prisma migrations in development mode.
    ```bash
    yarn prisma migrate dev
    ```

3. `prisma:clear`: Resets the Prisma migrations.
    ```bash
    yarn prisma migrate reset
    ```

4. `prisma:seed`: Seeds the database using the seed script.
    ```bash
    yarn ts-node prisma/seed/seed.ts
    ```

5. `start`: Starts the NestJS application.
    ```bash
    yarn nest start
    ```

6. `start:watch`: Starts the NestJS application in watch mode with debugging enabled.
    ```bash
    yarn start --debug --watch
    ```
