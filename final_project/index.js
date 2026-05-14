const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');

const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();
app.use(express.json());

// session middleware
app.use(
    "/customer",
    session({
        secret: "fingerprint_customer",
        resave: true,
        saveUninitialized: true
    })
);

// auth middleware (required for assignment structure)
app.use("/customer/auth/*", function auth(req, res, next) {
    let token = req.headers.authorization;

    if (!token) {
        return res.status(403).json({ message: "Login required" });
    }

    try {
        token = token.split(" ")[1];
        const user = jwt.verify(token, "fingerprint_customer");
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid Token" });
    }
});

// routes
app.use("/customer", customer_routes);
app.use("/", genl_routes);

// register users
const users = [];

app.post("/register", (req, res) => {
    const { username, password } = req.body;

    const exists = users.find(u => u.username === username);
    if (exists) {
        return res.status(400).json({ message: "User already exists" });
    }

    users.push({ username, password });

    return res.status(200).json({
        message: "User successfully registered. Now you can login"
    });
});

const PORT = 5000;
app.listen(PORT, () => console.log("Server is running"))