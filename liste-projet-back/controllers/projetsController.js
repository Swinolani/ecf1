const Projets = require("../models/projetsModel");
const Users = require("../models/usersModel");
const projetsController = {
  create: async (req, res) => {
    try {
      const userByUsername = await Users.findOne({
        where: { use_pseudo: req.body.pseudo },
      });
      const newProjets = await Projets.create({
        pro_nom: req.body.nom,
        pro_desc: req.body.description,
        use_id: userByUsername.use_id,
      });
      res.status(200).json({ message: "Projet crée avec succès" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getProjetsByPseudo: async (req, res) => {
    try {
      const userByUsername = await Users.findOne({
        where: { use_pseudo: req.query.pseudo },
      });

      if (!userByUsername) {
        return res.status(404).json({ message: "Utilisateur non trouvé." });
      }

      const listProjets = await Projets.findAll({
        where: { use_id: userByUsername.use_id },
      });

      res.status(200).json(listProjets);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Une erreur est survenue lors de la récupération des projets.",
      });
    }
  },
  // UPDATE QUI MARCHE PAS
  updateProjetsById: async (req, res) => {
    try {
      const userByUsername = await Users.findOne({
        where: { use_pseudo: req.body.pseudo },
      });

      if (!userByUsername) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      const updatedProjets = await Projets.update(
        {
          pro_nom: req.body.nomModif,
          pro_desc: req.body.descModif,
        },
        {
          where: {
            use_id: userByUsername.use_id,
            pro_nom: req.body.nomModif,
            pro_desc: req.body.descModif,
          },
        }
      );
      if (updatedProjets[0] === 1) {
        res.status(200).json({ message: "Projet mis à jour avec succès" });
      } else {
        res.status(404).json({ message: "Projet non trouvé" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  deleteById: async (req, res) => {
    console.log(req.query);

    try {
      const userByUsername = await Users.findOne({
        where: { use_pseudo: req.query.pseudo },
      });

      if (!userByUsername) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      const projetByName = await Projets.findOne({
        where: { pro_nom: req.query.nomModif, use_id: userByUsername.use_id },
      });

      if (!projetByName) {
        return res.status(404).json({ message: "Projet non trouvé" });
      }

      await projetByName.destroy();

      res.status(200).json({ message: "Le projet a été supprimé" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
module.exports = projetsController;
