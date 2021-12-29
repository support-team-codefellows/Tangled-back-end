'use strcit'

const Ticket = (sequelize, DataTypes) => sequelize.define('Ticket', {
    
    Answer: { type: DataTypes.STRING, required: true },
    
  });
  
  module.exports = Ticket;
  