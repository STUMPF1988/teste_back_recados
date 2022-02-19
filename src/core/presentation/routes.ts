import express from "express";
import { RecadosRouter } from "../../features/recados/presentation/routes/recados-routes";

export const makeRoutes = (app: express.Application) => {
    app.use("/recados", RecadosRouter.getRoutes());
};