var express = require('express');
var {User, Comment } = require('../models');

var router = express.Router();

router.get('/:id', async(req, res, next)=>{
    try{
        const comments = await Comment.findAll({
            include:{
                model: User,
                where: {id: req.params.id},
            },
        });
        console.log(comments);
        res.json(comments);
    }catch (e) {
        console.error(e);
        next(e);
    }
});

router.post('/', function(req, res, next) {
Comment.create({
    commenter: req.body.id,
    comment: req.body.comment,
})
    .then((result) => {
        console.log(result);
        res.status(201).json(result);
    })
    .catch((err) => {
        console.error(err);
        next(err);
    });
});

router.patch('/:id', function(req, res, next) {
Comment.update({ comment: req.body.comment }, { where: { id: req.params.id } })
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        console.error(err);
        next(err);
    });
});

router.delete('/:id', function(req, res, next) {
    Comment.destroy({ where: { id: req.params.id } })
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
});

module.exports = router;