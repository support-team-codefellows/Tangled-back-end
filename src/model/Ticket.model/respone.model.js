const response = (sequelize, DataTypes) =>
  sequelize.define("response", {
    username: { type: DataTypes.STRING, required: true },
    response: { type: DataTypes.STRING, required: true },
    customername: { type: DataTypes.STRING, required: true },
    ticketid: {type: DataTypes.INTEGER} 
  });

module.exports = response;

