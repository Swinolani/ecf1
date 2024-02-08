function isAuthenticated(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;

    return next();
  } catch (error) {
    // L'utilisateur n'est pas authentifié :
    res.json("veuillez vous connecter");
  }
}
module.exports = isAuthenticated;
