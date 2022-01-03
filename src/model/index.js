'use strict'
const { Sequelize, DataTypes } = require('sequelize');
const Users = require('./users.model/users.model');
const Collection = require('./collection');
const rateModel = require('./users.model/rating.model');

const POSTGRES_URL = process.env.NODE_ENV === 'test' ? "sqlite:memory:" : process.env.DATABASE_URL

let sequelizeOptions = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
} : {};


let sequelize = new Sequelize(POSTGRES_URL, sequelizeOptions);

const usersModel = Users(sequelize, DataTypes)
const usersCollection = new Collection(usersModel)
const Rate = rateModel(sequelize, DataTypes);
const rateCollection = new Collection(Rate);

module.exports = {

  db: sequelize,
  usersCollection: usersCollection,
  Users: usersModel,
  rateCollection: rateCollection
}





