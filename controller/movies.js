import movies from "../model/fileSystem/data.json" assert { type: "json" };
import { Movie } from "../model/mongoDB/movie.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

export const movieController = {
  async getAll(req, res) {
    const movieCollection = await Movie.find();
    movieCollection
      ? res
          .status(200)
          .json({ success: true, message: "List of movies", data: movies })
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
    const idPosta = new ObjectId(req.params.id);
    try {
      await Movie.findByIdAndDelete(idPosta);
      res.status(200).json({ success: true, message: "Movie deleted" });
    } catch (err) {
      res.status(308).json({ success: false, message: err.message });
    }
  },
};
