import express from "express";
import router from "./routes";
import { resolve } from "node:path";
import "./database";
import cors from "cors";

class App {
  constructor() {
    this.app = express();
    this.app.use(cors());
    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use(express.json());
    this.app.use(
      "/product-file",
      express.static(resolve(__dirname, "..", "uploads"))
    );
    this.app.use(
      "/category-file",
      express.static(resolve(__dirname, "..", "uploads"))
    );
  }

  routes() {
    this.app.use(router);
  }
}

export default new App().app;
