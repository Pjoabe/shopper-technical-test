import express from "express";
import uploadRouter from "./routes/uploadRoute";
import confirmRouter from "./routes/confirmRoute";
import listRouter from "./routes/listRoute";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(uploadRouter);
app.use(confirmRouter);
app.use(listRouter);

export default app;
