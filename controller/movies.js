import { Movie } from "../model/mongoDB/movie.js";

export const movieController = {
  async getAll(req, res) {
    const movieCollection = await Movie.find();
    movieCollection
      ? res.status(200).json({
          success: true,
          message: "List of movies",
          data: movieCollection, //acá estábamos pasando movies, que venía del json y por eso se enojaba (con justa razón) Mongoose.
        })
      : res
          .status(404)
          .json({ success: false, message: "Movies database empty" });
  },
  getByTitle(req, res) {
    const { title } = req.query;
    if (!title)
      res
        .status(400)
        .json({ success: false, message: "Missing 'title' query param" });
  },
  async createOne(req, res) {
    const { title, year, director, duration, poster, genre, rate } = req.body;
    const newMovie = new Movie({
      title,
      year,
      director,
      duration,
      poster,
      genre,
      rate,
    });
    try {
      await newMovie.save();
      res.status(200).json({ success: true, data: newMovie });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },
  async deleteOne(req, res) {
    try {
      await Movie.findById;
      res.status(200).json({ success: true, message: "Movie deleted" });
    } catch (err) {
      res.status(308).json({ success: false, message: err.message });
    }
  },
};
