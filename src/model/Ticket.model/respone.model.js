const response = (sequelize, DataTypes) =>
  sequelize.define("response", {
    username: { type: DataTypes.STRING, required: true },
    response: { type: DataTypes.STRING, required: true },
    
  });

module.exports = response;

