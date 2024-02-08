const Users = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userController = {
  // CREATE
  create: async (req, res) => {
    console.log(req.body);
    try {
      const userByUsername = await Users.findOne({
        where: { use_pseudo: req.body.pseudo },
      });
      if (!userByUsername) {
        try {
          const hashedPassword = await bcrypt.hash(req.body.password, 10);
          const newUser = await Users.create({
            use_pseudo: req.body.pseudo,
            use_email: req.body.email,
            use_password: hashedPassword,
          });
          const payload = {
            infoPseudoUser: newUser.use_pseudo,
          };
          const token = jwt.sign(payload, "RANDOM_TOKEN_SECRET", {
            expiresIn: "1d",
          });

          res.status(200).json({ token: token });
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      } else {
        res.status(200).json({ message: "L'utilisateur existe déjà !" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // FIND ALL
  getAll: async (req, res) => {
    try {
      const users = await Users.find();

      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // FIND BY ID
  getById: async (req, res) => {
    try {
      const user = await Users.findById(req.params.id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "Utilisateur non trouvé" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // UPDATE
  updateById: async (req, res) => {
    try {
      const updatedUser = await Users.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (updatedUser) {
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ message: "Utilisateur non trouvé" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // DELETE
  deleteById: async (req, res) => {
    try {
      const deletedUser = await Users.findByIdAndDelete(req.params.id);
      if (deletedUser) {
        res.status(200).json({ message: "Utilisateur supprimé avec succès" });
      } else {
        res.status(404).json({ message: "Utilisateur non trouvé" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getByUsername: async (req, res) => {
    try {
      const userByUsername = await Users.findOne({
        where: { use_pseudo: req.body.pseudo },
      });

      if (
        userByUsername != null &&
        userByUsername.use_pseudo == req.body.pseudo &&
        (await bcrypt.compare(req.body.password, userByUsername.use_password))
      ) {
        const payload = {
          infoPseudoUser: userByUsername.use_pseudo,
        };
        const token = jwt.sign(payload, "RANDOM_TOKEN_SECRET", {
          expiresIn: "1d",
        });
        res.status(200).json({ token: token });
      } else {
        res.status(200).json({ message: "Email ou mot de passe incorrect" });
      }
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },
};

module.exports = userController;
