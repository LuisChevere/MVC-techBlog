const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

//Gets all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: {
            exclude: ['password']
        }
    })
    .then(dbUserData = res.json(dbUserData))
    .catch(err => {
        res.status(500).json(err);
    });
});

