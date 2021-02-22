const mongoose = require('mongoose');
const History = require('../models/historyModel');
const User = require('../models/userModel');

const AddHistory = (req, res) => {
    const { date, nameCity, weather, idUser } = req.params
    let history = new History({ 'date': date, 'city': nameCity, 'weather': weather, 'user': idUser })
    history.save()
        .then((result) => {
            res.status(200).json({ result: result })
            console.log(`success:${result}`)
        })
        .catch((err) => {
            res.status(500)
            console.log(`error:${err}`)
        })
}

const GetHistoryForUser = (req, res) => {
    const { id } = req.params;
    History.find({ 'user': id })
        .then((result) => {
            res.status(200).send({ result });
        })
        .catch((err) => console.log(err))
}

module.exports = { AddHistory, GetHistoryForUser }