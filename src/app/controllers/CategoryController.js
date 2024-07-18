import * as Yup from "yup";
import Category from "../models/Category";
import User from "../models/User";
import Product from "../models/Product";

class CategoryController {
  async store(req, res) {
    const schema = Yup.object({
      name: Yup.string().required(),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(401).json({ error: err.errors });
    }

    const { admin: isAdmin } = await User.findByPk(req.userId);

    if (!isAdmin) {
      return res.status(401).json();
    }

    const { filename: path } = req.file;

    const { name } = req.body;

    const isNameValid = await Category.findOne({
      where: {
        name,
      },
    });

    if (isNameValid) {
      return res.status(401).json({ error: "Categoria já criada" });
    }

    const { id } = await Category.create({
      name,
      path,
    });

    return res.status(201).json({ id, name });
  }

  async index(req, res) {
    const categories = await Category.findAll();

    return res.status(201).json(categories);
  }

  async update(req, res) {
    const schema = Yup.object({
      name: Yup.string(),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(401).json({ error: err.errors });
    }

    const { admin: isAdmin } = await User.findByPk(req.userId);

    if (!isAdmin) {
      return res.status(401).json();
    }

    const { id } = req.params;

    const findProduct = await Category.findByPk(id);

    if (!findProduct) {
      return res.status(400).json({ error: "Id do produto incorreto" });
    }

    let path;

    if (req.file) {
      path = req.file.filename;
    }
    const { name } = req.body;

    if (name) {
      const isNameValid = await Category.findOne({
        where: {
          name,
        },
      });

      if (isNameValid && isNameValid.id == id) {
        return res.status(401).json({ error: "Categoria já criada" });
      }
    }

    await Category.update(
      {
        name,
        path,
      },
      {
        where: {
          id,
        },
      }
    );

    return res.status(200).json();
  }
}

export default new CategoryController();
