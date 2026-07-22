const express = require("express");
const path = require("path");
const session = require("express-session");
const methodOverride = require("method-override");
require("dotenv").config();
const db = require("./config/db");
const chainRoutes = require("./routes/chainRoutes");
const app = express();

const PORT = process.env.PORT || 3000;

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(
    session({
        secret: process.env.SESSION_SECRET || "mysecretkey",
        resave: false,
        saveUninitialized: true,
    })
);

app.use(methodOverride("_method"));

app.use("/", chainRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});