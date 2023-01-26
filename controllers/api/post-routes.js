const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//Gets all posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'content', 'title', 'created_at'],
        order: [
            ['created_at', 'DESC']
        ],
        include: [{
            model: User,
            attributes: ['username'],
        },
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username'],
            },
        },
    ],
    })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
        res.status(500).json(err);
    });
});