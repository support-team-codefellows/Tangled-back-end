'use strict';

const rateModel = (sequelize, DataTypes) => sequelize.define('Rate', {
    username: { type: DataTypes.STRING, required: true },
    rating: { type: DataTypes.FLOAT, required: true },
});

module.exports = rateModel;