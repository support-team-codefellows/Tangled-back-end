'use strict'
const {Sequelize,DataTypes}=require('sequelize');
const Users=require('./users.model/users.model');
const Collection=require('./collection');
const Ticket=require('./Ticket.model/Ticket')

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
  const ticketModel=Ticket(sequelize,DataTypes)
  const ticketCollection=new Collection(ticketModel)
    
    
    module.exports ={
      
        db: sequelize,
        usersCollection:usersCollection,
        Users: usersModel,

        ticketCollection: ticketCollection,
        Ticket: ticketModel

    }

  



