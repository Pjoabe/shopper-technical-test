import express, { Application } from 'express';

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
// Exemplo: app.use('/api', yourRouter);

export default app;
