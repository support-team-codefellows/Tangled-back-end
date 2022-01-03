'use strict';

const express = require('express');
const { rateCollection } = require('../model/index');
const rateRouter = express.Router();

rateRouter.get('/rate/', getAllRate);
rateRouter.get('/rate/:username', getOneRate);
rateRouter.post('/rate', addToRate);

async function getAllRate(req, res) {
    const allRate = await rateCollection.get();
    res.status(200).json(allRate);
}

async function getOneRate(req, res) {
    const username = req.params.username;
    const oneRate = await rateCollection.get(username);
    res.status(200).json(oneRate);
}

async function addToRate(req, res) {
    const obj = req.body;
    const allRate = await rateCollection.get();
    let checkUser = Object.keys(allRate).find(key => allRate[key] === obj.username);
    let newAdd;
    if (checkUser) {
        let newRating = ((checkUser.rating + obj.rating) / 2).toFixed(2);
        let newRate = {
            username: checkUser.username,
            rating: newRating
        }
        newAdd = await rateCollection.update(obj.username, newRate);
    } else {
        newAdd = await rateCollection.create(obj);
    }

    res.status(201).json(newAdd);
}

module.exports = rateRouter;