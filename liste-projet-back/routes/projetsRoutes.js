const express = require("express");
const router = express.Router();
const projet = require("../controllers/projetsController");
const isAuthenticated = require("../config/authentication");
// Poster dans la bdd
router.post("/listeProjets", projet.create);
router.get("/listeProjets", projet.getProjetsByPseudo);
router.put("/listeProjets", projet.updateProjetsById);
router.delete("/listeProjets", projet.deleteById);

module.exports = router;
