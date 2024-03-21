import express, { Application } from "express";
import Routes from "./routes";
import Database from "./db";

export default class Server {
  constructor(app: Application) {
    this.config(app);
    this.syncDatabase();
    new Routes(app);
  }

  private config(app: Application): void {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE"
      );
      next();
    });
  }

  private syncDatabase(): void {
    const db = new Database();
    db.connectToDatabase();
    db.sequelize?.sync();
  }
}
