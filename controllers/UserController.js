const users = require("../models/UserModel");

module.exports.addToLikedMovies = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await users.findOne({ email }).catch((err) => {
      console.log("Error in finding user", err);
    });
    if (user) {
      const { likedMovies } = user;
      const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id);
      // console.log(movieAlreadyLiked, "liked movies");
      if (!movieAlreadyLiked) {
        // console.log("movie is not liked");
        await users
          .findByIdAndUpdate(
            user._id,
            {
              likedMovies: [...user.likedMovies, data],
            },
            { new: true }
          )
          .catch((err) => {
            console.log(err);
          });
        // console.log(likedMovies, "if movie not liked");
      } else {
        return res.json({ msg: "Movie already added to the liked list." });
      }
    } else {
      await users.create({ email, likedMovies: [data] }).catch((err) => {
        console.log("error in creating user", err);
      });
    }
    // console.log(likedMovies, "when creating user");
    return res.json({ msg: "Movie added successfully" });
  } catch (error) {
    return res.json({ msg: "Error adding movie" });
  }
};

module.exports.getLikedMovies = async (req, res) => {
  try {
    const { email } = req.params;

    const user = await users.findOne({ email });
    if (user) {
      res.json({ msg: "success", movies: user.likedMovies });
    } else return res.json({ msg: "user with given email not found." });
  } catch (err) {
    return res.json({ msg: "Error fetching movies" });
  }
};

module.exports.removeFromLikedMovies = async (req, res) => {
  try {
    const { email, movieId } = req.body;
    const user = await users.findOne({ email });
    if (user) {
      const { likedMovies } = user;
      const movieIndex = likedMovies.findIndex(({ id }) => id === movieId);
      if (movieIndex === -1) res.status(400).send({ msg: "movie not found" });
      likedMovies.splice(movieIndex, 1);
      await users
        .findByIdAndUpdate(
          user._id,
          {
            likedMovies,
          },
          { new: true }
        )
        .catch((err) => {
          console.log(err);
        });
      return res.json({ msg: "Movie deleted", movies: likedMovies });
    }
  } catch (err) {
    return res.json({ msg: "Error deleting movie" });
  }
};
