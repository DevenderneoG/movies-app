const mongoose = require('mongoose');

const movieSchema =  new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  releaseYear: {
    type: String,
    required: true,
  },
  genre: [
    {
      type: String,
      enum: [
        "Action",
        "Drama",
        "Comedy",
        "Romance",
        "Thriller",
        "Fantasy",
        "Sci-Fi",
        "Horror",
        "Sports",
        "Musical",
        "Other",
      ],
    },
  ],
  director: {
    type: String,
    required: true
  },
  actors: [
    {
      type: String
    }
  ],
  language: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    default: "India",
  },
  rating: {
    type: String,
    min: 0,
    max: 0,
    default: 0,
  },
  plot: {
    type: String,
  },
  awards: {
    type: String,
  },
  posterUrl: {
    type: String,
  },
  trailerUrl: {
    type: String
  }
},
{
  timestamps: true,
},
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;

