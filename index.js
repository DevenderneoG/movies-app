const express = require("express");
const cors = require("cors");
const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

const {initializeDatabase} = require("./db/db.connect");
const Movie = require("./models/movie.models");

app.use(express.json());

initializeDatabase();

async function createMovie(newMovie) {
try {
  const movie = new Movie(newMovie);
  const saveMovie = await movie.save();
  console.log("New Movie Data:", saveMovie)
} catch (error) {
  throw error
}
} 


app.post("/movies", async (req, res) => {
  try {
    const savedMovie = await createMovie(req.body);
    res.status(201).json({message: "Movie added successfully.", movie: savedMovie})
  } catch (error) {
    res.status(500).json({error: "Failed to add movie."})
  }
})

// find a movie with a particular title

async function readMovieByTitle(movieTitle) {
  try {
    const movie = await Movie.findOne({title: movieTitle})
   return movie
  } catch {
    throw error
  }
}

app.get("/movies/:title", async (req, res) => {
  try {
    const movie = await readMovieByTitle(req.params.title);
    if(movie) {
      res.json(movie)
    } else {
      res.status(404).json({error: 'Movie not found.'})
    }
  } catch (error) {
    res.status(500).json({error: "Failed to fetch movie."})
  }
})

// readMovieByTitle("Bahubali: The Beginning");

// to get all the movies in the database

async function readAllMovies(){
  try {
    const allMovies = await Movie.find();
    return allMovies;
  } catch(error) {
    console.log(error)
  }
}

app.get("/movies", async (req, res) => {
 try {
  const movies = await readAllMovies();
  if(movies.length != 0) {
    res.json(movies)
  } else {
    res.status(404).json({error: "No movies found."})
  }
 } catch (error) {
  res.status(500).json({error: "Failed to fetch movies."})
 }
})

// readAllMovies();


// get movie by director name

async function readMovieByDirector(directorName) {
  try {
    const movieByDirector = await Movie.find({director: directorName});
    return movieByDirector;
  } catch(error) {
    console.log(error)
  }
}

app.get("/movies/director/:directorName", async (req, res) => {
  try {
    const movies = await readMovieByDirector(req.params.directorName);
    if(movies.length != 0) {
      res.json(movies)
    } else {
      res.status(404).json({error: "No movies found."})
    }
  } catch (error) {
    res.status(500).json({error: "Failed to fetch movies."})
  }
})


// readMovieByDirector("Karan Johar");

async function readMovieByGenre(genreName) {
  try {
    const movieByGenre = await Movie.find({ genre: genreName})
    return movieByGenre
  } catch (error) {
    console.log(error)
  }
}


app.get("/movies/genre/:genreName", async (req, res) => {
  try {
    const moviesByGenre = await readMovieByGenre(req.params.genreName);
    if(moviesByGenre.length != 0) {
      res.json(moviesByGenre)
    } else {
      res.status(404).json({error: "No movies found."})
    }
  } catch (error) {
    res.status(500).json({error: "Failed to fetch movies."})
  }
})

//find movie by id and update it's rating

async function updateMovie(movieId, dataToUpdate) {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(movieId, dataToUpdate, {new: true})
    return updatedMovie;
  } catch (error) {
    console.log("Error in updating Movie rating", error)
  }
}

app.post("/movies/:movieId", async (req, res) => {
  try {
    const updatedMovieById = await updateMovie(req.params.movieId, req.body);
    if (updatedMovieById) {
      res.status(200).json({message: "Movies updated successfully.", updatedMovieById: updatedMovieById})
    } else {
      res.status(404).json({error: "Movie not found."})
    }
  } catch (error) {
    res.status(500).json({error: "Failed to update movie."})
  }
})

async function deleteMovie(movieId) {
  try {
    const deleteMovie = await Movie.findByIdAndDelete(movieId);
    return deleteMovie;
  } catch (error) {
    console.log(error)
  }
}

app.delete("/movies/:movieId", async (req,res) => {
  try {
    const deletedMovie = await deleteMovie(req.params.movieId);
    if(deletedMovie) {
      res.status(200).json({message: "Movie deleted successfully.", deletedMovie: deletedMovie})
    }
  } catch (error) {
    res.status(500).json({error: "Failed to delete movie."})
  }
})

const PORT = 3000;

app.listen(PORT, ()=> {
  console.log("Server running on port", PORT)
})