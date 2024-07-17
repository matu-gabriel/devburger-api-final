import * as Yup from "yup";
import User from "../models/User";
import jwt from "jsonwebtoken";
import authConfig from "../../config/auth";

class SessionController {
  async store(req, res) {
    const schema = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });

    const isValid = await schema.isValid(req.body);

    const emailOrPasswordInvalid = () => {
      res.status(401).json({ error: "Email ou senha incorretos" });
    };

    if (!isValid) {
      return emailOrPasswordInvalid();
    }

    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return emailOrPasswordInvalid();
    }

    const verifyPassword = await user.comparePassword(password);

    if (!verifyPassword) {
      return emailOrPasswordInvalid();
    }

    return res.status(201).json({
      id: user.id,
      name: user.name,
      email,
      admin: user.admin,
      token: jwt.sign({ id: user.id, name: user.name }, authConfig.secretKey, {
        expiresIn: authConfig.expireIn,
      }),
    });
  }
}

export default new SessionController();
