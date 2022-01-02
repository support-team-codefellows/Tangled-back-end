"use strict";

const Ticket = (sequelize, DataTypes) =>
  sequelize.define("Ticket", {
    customerName: { type: DataTypes.STRING  },
    phoneNumber: { type: DataTypes.STRING  },
    subject: { type: DataTypes.STRING },
    department: { type: DataTypes.STRING,  },
    description: { type: DataTypes.STRING },
    status: { type: DataTypes.STRING  },
    username: { type: DataTypes.STRING  },
    response: { type: DataTypes.STRING  },
  });

module.exports = Ticket;