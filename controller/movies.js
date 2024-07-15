import movies from "../model/fileSystem/data.json" assert { type: "json" };

export const movieController = {
  getAll(req, res) {
    movies.length
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
};
