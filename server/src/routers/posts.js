const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const postModel = require('../model/posts.js');
router.use(bodyParser.json());

/* LIST POSTS */
router.get('/posts',  function(req, res, next) {
    const {start} = req.query;
    postModel.listPosts(start).then(
        (posts) => {
            res.json(posts);
        }
    ).catch(next);
});

/* CREATE A POST */
router.post('/posts', function(req, res, next) {
    const { _mood, _text } = req.body;
    if(!_mood || !_text){
        const err = new Error('Mood and Text are required');
        err.status = 400;
        throw err;
    }
    postModel.createPost(_mood, _text).then(
        (newpost) => {
            res.json(newpost);
        }
    ).catch(next);
});

module.exports = router;