const express = require("express");
const app = express();
const corsMiddleware = require("./config/CORS");
const usersRoutes = require("./routes/usersRoutes");
// const tachesRoutes = require("./routes/tachesRoutes");
const projetsRoutes = require("./routes/projetsRoutes");

// Définir le répertoire statique pour les fichiers CSS
app.use("/assets", express.static("assets"));
// Utiliser le middleware intégré pour analyser les données du formulaire
app.use(express.json());
// Connexion à MySQL
const sequelize = require("./config/db");
sequelize.sync();
// Utilisation du middleware CORS pour toutes les routes
app.use(corsMiddleware);
// Utliser les routes etc.
app.use("/", usersRoutes);
// app.use("/", tachesRoutes);
app.use("/", projetsRoutes);

// Port d'écoute
const port = 3000;
app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});
