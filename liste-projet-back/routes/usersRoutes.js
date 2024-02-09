const express = require("express");
const router = express.Router();
const user = require("../controllers/usersController");
const isAuthenticated = require("../config/authentication"); // Pas utilisé
// Poster dans la bdd
router.post("/inscription", user.create);
router.post("/connexion", user.getByUsername);
module.exports = router;
