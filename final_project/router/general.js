const express = require('express');
const public_users = express.Router();

let books = {
    "1": { "author": "Chinua Achebe", "title": "Things Fall Apart", "reviews": {} },
    "2": { "author": "Hans Christian Andersen", "title": "Fairy tales", "reviews": {} },
    "3": { "author": "Dante Alighieri", "title": "The Divine Comedy", "reviews": {} },
    "4": { "author": "Unknown Author", "title": "Book Four", "reviews": {} },
    "5": { "author": "Unknown Author", "title": "Book Five", "reviews": {} },
    "6": { "author": "Unknown Author", "title": "Book Six", "reviews": {} },
    "7": { "author": "Unknown Author", "title": "Book Seven", "reviews": {} },
    "8": { "author": "Unknown Author", "title": "Book Eight", "reviews": {} },
    "9": { "author": "Unknown Author", "title": "Book Nine", "reviews": {} },
    "10": { "author": "Unknown Author", "title": "Book Ten", "reviews": {} }
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
const axios = require('axios');

// Get all books using async callback function
public_users.get('/asyncbooks', async function (req, res) {
    try {
        const response = await axios.get('http://localhost:5000/');
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Search by ISBN using Promises
public_users.get('/asyncisbn/:isbn', function (req, res) {

    axios.get(`http://localhost:5000/isbn/${req.params.isbn}`)
        .then(response => {
            return res.status(200).json(response.data);
        })
        .catch(error => {
            return res.status(500).json({ message: error.message });
        });

});

// Search by Author
public_users.get('/asyncauthor/:author', async function (req, res) {

    try {
        const response = await axios.get(`http://localhost:5000/author/${req.params.author}`);
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

});

// Search by Title
public_users.get('/asynctitle/:title', async function (req, res) {

    try {
        const response = await axios.get(`http://localhost:5000/title/${req.params.title}`);
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

});

module.exports.general = public_users;
module.exports.books = books;