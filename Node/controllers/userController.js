const { mongoose } = require('mongoose');
const User = require('../models/userModel');

const AddNewUser = (req, res) => {
    const { userName, password } = req.params;
    User.count({ 'name': userName, 'password': password })
        .then((x) => {
            if (x < 1) {
                let user = new User({ 'name': userName, 'password': password })
                user.save().then(() => {
                    res.status(200).json({ user: user })
                })
            }
            else res.status(500).json({ message: "user exsit" })
        })
        .catch((err) => {
            res.status(500).send({err:err})
        })
}

const GetUserByDetails = (req, res) => {
    const { userName, password } = req.params;
    User.find({ 'name': userName, 'password': password })
        .then((result) => { res.status(200).json({ result: result }) })
        .catch((err) => { res.status(500).json({ err }) })
}

module.exports = { AddNewUser, GetUserByDetails };