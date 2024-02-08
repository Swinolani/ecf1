const cors = require("cors");

// Définition de la configuration CORS
const corsOptions = {
  origin: "*", // Ou vous pouvez spécifier les domaines autorisés ['http://example1.com', 'http://example2.com']
  methods: "*", // Méthodes HTTP autorisées
  allowedHeaders: "*", // En-têtes autorisés
};

// Création du middleware CORS
const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
