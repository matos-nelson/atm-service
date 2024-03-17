import { Application } from "express";
import accountRoutes from "./account.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api/account", accountRoutes);
  }
}