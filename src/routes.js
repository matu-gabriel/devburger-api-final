import { Router } from "express";
import UserController from "./app/controllers/UserController.js";
import SessionController from "./app/controllers/SessionController.js";
import ProductController from "./app/controllers/ProductController.js";
import multer from "multer";
import configMulter from "./config/multer.js";
import authMiddleware from "./app/middlewares/auth.js";
import CategoryController from "./app/controllers/CategoryController.js";
import OrderController from "./app/controllers/OrderController.js";

const router = new Router();
const upload = multer(configMulter);

router.get("/", (_, res) => {
  return res.json({ messege: "Hello my firts API" });
});

router.post("/users", UserController.store);
router.post("/session", SessionController.store);

router.use(authMiddleware);
router.post("/products", upload.single("file"), ProductController.store);
router.get("/products", ProductController.index);
router.put("/products/:id", upload.single("file"), ProductController.update);

router.post("/categories", upload.single("file"), CategoryController.store);
router.get("/categories", CategoryController.index);
router.put("/categories/:id", upload.single("file"), CategoryController.update);

router.post("/orders", OrderController.store);
router.get("/orders", OrderController.index);
router.put("/orders/:id", OrderController.update);

export default router;
