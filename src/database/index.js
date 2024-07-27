import Sequelize from "sequelize";
import User from "../app/models/User.js";
import Product from "../app/models/Product.js";
import Category from "../app/models/Category.js";
// import configDatabase from "../config/database";
import mongoose from "mongoose";

const models = [User, Product, Category];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(
      "postgresql://postgres:eGDCuvXUXtlymmplHkbsBotFUKjxuegY@roundhouse.proxy.rlwy.net:56816/railway"
    );
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      "mongodb://mongo:QlocpdwlrEYktbreiDmoBKrOvebaiqAu@roundhouse.proxy.rlwy.net:38779"
    );
  }
}

export default new Database();
