import express from "express";
import router from "./routes.js";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import "./database/index.js";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
