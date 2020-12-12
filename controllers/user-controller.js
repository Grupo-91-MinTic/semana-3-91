const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.list = async(req, res, next) => {
    try {
        const user = await db.user.findAll();
        res.status(200).json(user)
    }catch (error) {
        res.status(500).send({
            message: 'Error: ' + error
        });
        next(error);
    }
};

exports.register = async(req, res, next) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 10)
        const user = await db.user.create(req.body);
        res.status(201).json(user)
    }catch (error){
        res.status(500).send({
            message: 'Error' + error
        });
        next(error);
    }
};

exports.signin = async(req, res, next) => {
    try {
        const user = await db.user.findOne({where: {email: req.body.email}})
        if (user){
            const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (passwordIsValid){
                const token = jwt.sign({
                    id: user.id,
                    name: user.name,
                    email: user.email
                },'config.secret', {
                    expiresIn: 3600
                }
                );
                res.status(200).send({ auth: true, accessToken: token });
            }else {
                res.status(401).send({ auth: false, accessToken: null, reason: "Invalid Password!" });
            }
        }else {
            res.status(404).send('User Not Found.');
        }
    }catch (error) {
        res.status(500).send({
            message: 'Error' + error
        });
        next(error);
    }
};
