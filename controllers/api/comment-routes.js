const router = require('express').Router();
const { User,Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//Gets all comments
router.get('/', (req, res => {
    Comment.findAll()
        .then((dbCommentData) => res.json(dbCommentData))
        .catch((err) =>{
            res.statusCode(500).json(err);
        });
}))