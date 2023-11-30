// Create web server
var express = require('express');
var router = express.Router();

// Create database connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {});

// Create schema
var commentSchema = mongoose.Schema({
    comment: String,
    date: Date
});

// Create model
var Comment = mongoose.model('Comment', commentSchema);

// Create routes
router.get('/', function (req, res) {
    Comment.find(function (err, comments) {
        if (err) {
            return console.error(err);
        }
        res.json(comments);
    });
});

router.post('/', function (req, res) {
    var comment = new Comment({
        comment: req.body.comment,
        date: new Date()
    });
    comment.save(function (err, comment) {
        if (err) {
            return console.error(err);
        }
        res.json(comment);
    });
});

module.exports = router;

// Path: comments.js
// Create web server
var express = require('express');
var router = express.Router();

// Create database connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {});

// Create routes
router.get('/', function (req, res) {
    var Comment = mongoose.model(req.path, new mongoose.Schema({
        comment: String,
        date: Date
    }));
    Comment.find(function (err, comments) {
        if (err) {
            return console.error(err);
        }
        res.json(comments);
    });
});

router.post('/', function (req, res) {
    var Comment = mongoose.model(req.path, new mongoose.Schema({
        comment: String,
        date: Date
    }));
    var comment = new Comment({
        comment: req.body.comment,
        date: new Date()
    });
    comment.save(function (err, comment) {
        if (err) {
            return console.error(err);
        }
        res.json(comment);
    });
});

module.exports = router;
