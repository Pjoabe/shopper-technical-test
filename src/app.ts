import express, { Application } from 'express';

const app: Application = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Exemplo: app.use('/api', yourRouter);

export default app;
