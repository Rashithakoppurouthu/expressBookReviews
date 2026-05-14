const express = require('express');
const public_users = express.Router();

let books = {
    "1": {
        "author": "Chinua Achebe",
        "title": "Things Fall Apart",
        "reviews": {}
    },
    "2": {
        "author": "Hans Christian Andersen",
        "title": "Fairy tales",
        "reviews": {}
    },
    "3": {
        "author": "Dante Alighieri",
        "title": "The Divine Comedy",
        "reviews": {}
    }
};

public_users.get('/', function (req, res) {
    return res.status(200).json(books);
});

public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    return res.status(200).json(books[isbn]);
});

public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;

    let filtered = {};

    Object.keys(books).forEach(key => {
        if (books[key].author === author) {
            filtered[key] = books[key];
        }
    });

    return res.status(200).json(filtered);
});

public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;

    let filtered = {};

    Object.keys(books).forEach(key => {
        if (books[key].title === title) {
            filtered[key] = books[key];
        }
    });

    return res.status(200).json(filtered);
});

public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    return res.status(200).json(books[isbn].reviews);
});

module.exports.general = public_users;
module.exports.books = books;