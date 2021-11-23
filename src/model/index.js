'use strict'
const {Sequelize,DataTypes}=require('sequelize');
const Users=require('./users.model/users.model');
const Collection=require('./collection');

const POSTGRES_URL= process.env.NODE_ENV ==='test'? "sqlite:memory:" : process.env.DATABASE_URL

let sequelizeOptions = process.env.NODE_ENV === 'production' ? {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      }
    }
  } : {};


  let sequelize = new Sequelize(POSTGRES_URL, sequelizeOptions);

  const usersModel=Users(sequelize,DataTypes)
  const usersCollection= new Collection(usersModel)
    
    
    module.exports ={
        db: sequelize,
        usersCollection:usersCollection,
        Users: usersModel

    }

  



