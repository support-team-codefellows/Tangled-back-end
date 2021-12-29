"use strict";

const OnsiteTicket = (sequelize, DataTypes) =>
  sequelize.define("Onsite", {
    customerName: { type: DataTypes.STRING, required: true },
    phoneNumber: { type: DataTypes.STRING, required: true },
    subject: { type: DataTypes.STRING, required: false },
    department: { type: DataTypes.STRING, required: true },
    description: { type: DataTypes.STRING, required: false },
    status: { type: DataTypes.STRING, required: true },

  });

module.exports = OnsiteTicket;

