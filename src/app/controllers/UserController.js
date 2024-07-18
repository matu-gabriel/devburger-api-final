import { v4 } from "uuid";
import User from "../models/User.js";
import * as Yup from "yup";

class UserController {
  async store(req, res) {
    const schema = Yup.object({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
      admin: Yup.boolean(),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(401).json({ error: err.errors });
    }

    const { name, email, password, admin } = req.body;

    const userInvalid = await User.findOne({
      where: {
        email,
      },
    });

    if (userInvalid) {
      return res.status(401).json({ error: "Usuario ja cadastrado" });
    }

    const user = await User.create({
      id: v4(),
      name,
      email,
      password,
      admin,
    });

    return res.status(201).json({ id: user.id, name, email, password, admin });
  }
}

export default new UserController();
