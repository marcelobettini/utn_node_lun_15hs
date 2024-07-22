import { mongoose } from "mongoose";
export const { ObjectId } = mongoose.Types;
const currentYear = new Date().getFullYear();

//Mongo DB Schema
const movieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
    min: [1896, "Year must be al least 1896"],
    max: [currentYear, `Year cannot exceed ${currentYear}`],
  },
  director: { type: String, required: true },
  duration: { type: Number, required: true },
  poster: { type: String, required: true },
  genre: { type: [String], required: true },
  rate: { type: Number, default: 5 },
});

export const Movie = mongoose.model("Movie", movieSchema);
