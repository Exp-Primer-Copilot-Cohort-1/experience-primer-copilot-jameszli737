// Create web server

var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');
var Post = require('../models/post');
var User = require('../models/user');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var config = require('../config/database');

// router.get('/comments', function(req, res) {
//     console.log('Get request for all comments');
//     Comment.find({})
//         .exec(function(err, comments) {
//             if (err) {
//                 console.log("Error retrieving comments");
//             } else {
//                 res.json(comments);
//             }
//         });
// });

router.get('/comments/:id', function(req, res) {
    console.log('Get request for a single comment');
    Comment.findById(req.params.id)
        .exec(function(err, comment) {
            if (err) {
                console.log("Error retrieving comment");
            } else {
                res.json(comment);
            }
        });
});

router.post('/comments', function(req, res) {
    console.log('Post a comment');
    var newComment = new Comment();
    newComment.postId = req.body.postId;
    newComment.userId = req.body.userId;
    newComment.username = req.body.username;
    newComment.text = req.body.text;
    newComment.save(function(err, insertedComment) {
        if (err) {
            console.log('Error saving comment');
        } else {
            res.json(insertedComment);
        }
    });
});

router.put('/comments/:id', function(req, res) {
    console.log('Update a comment');
    Comment.findByIdAndUpdate(req.params.id, {
            $set: { userId: req.body.userId, username: req.body.username, text: req.body.text }
        }, {
            new: true
        },
        function(err, updatedComment) {
            if (err) {
                res.send("Error updating comment");
            } else {
                res.json(updatedComment);
            }
        }
    );
});

router.delete('/comments/:id', function(req, res) {
    console.log('Deleting a comment');
    Comment.findByIdAndRemove(req.params.id, function(err, deletedComment) {
        if (err) {
            res.send("Error deleting comment");
        } else {
            res.json(deletedComment);
        }
    });
});

module.exports = router;