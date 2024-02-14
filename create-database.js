import mongoose from "mongoose";
const mongo_HOST = "mongodb://localhost:27017/assignment-1-movies-db";
const sampleMovies = [
  {
    title: "Inception",
    director: "Christopher Nolan",
    releaseYear: 2010,
    genres: ["Action", "Sci-Fi", "Thriller"],
    ratings: [8.8, 4.5, 9.2],
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
  },
  {
    title: "The Shawshank Redemption",
    director: "Frank Darabont",
    releaseYear: 1994,
    genres: ["Drama"],
    ratings: [9.3, 4.7, 9.6],
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
  },
  {
    title: "The Dark Knight",
    director: "Christopher Nolan",
    releaseYear: 2008,
    genres: ["Action", "Crime", "Drama"],
    ratings: [9.0, 4.8, 9.5],
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
  },
  {
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    releaseYear: 1994,
    genres: ["Crime", "Drama"],
    ratings: [8.9, 4.6, 9.4],
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
  },
  {
    title: "Forrest Gump",
    director: "Robert Zemeckis",
    releaseYear: 1994,
    genres: ["Drama", "Romance"],
    ratings: [8.8, 4.7, 9.3],
    cast: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
  },
  {
    title: "The Godfather",
    director: "Francis Ford Coppola",
    releaseYear: 1972,
    genres: ["Crime", "Drama"],
    ratings: [9.2, 4.8, 9.7],
    cast: ["Marlon Brando", "Al Pacino", "James Caan"],
  },
  {
    title: "Fight Club",
    director: "David Fincher",
    releaseYear: 1999,
    genres: ["Drama"],
    ratings: [8.8, 4.6, 9.1],
    cast: ["Brad Pitt", "Edward Norton", "Helena Bonham Carter"],
  },
  {
    title: "The Matrix",
    director: "Lana Wachowski",
    releaseYear: 1999,
    genres: ["Action", "Sci-Fi"],
    ratings: [8.7, 4.5, 9.0],
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
  },
  {
    title: "Schindler's List",
    director: "Steven Spielberg",
    releaseYear: 1993,
    genres: ["Biography", "Drama", "History"],
    ratings: [8.9, 4.7, 9.5],
    cast: ["Liam Neeson", "Ben Kingsley", "Ralph Fiennes"],
  },
  {
    title: "Goodfellas",
    director: "Martin Scorsese",
    releaseYear: 1990,
    genres: ["Biography", "Crime", "Drama"],
    ratings: [8.7, 4.6, 9.2],
    cast: ["Robert De Niro", "Ray Liotta", "Joe Pesci"],
  },
  {
    title: "The Silence of the Lambs",
    director: "Jonathan Demme",
    releaseYear: 1991,
    genres: ["Crime", "Drama", "Thriller"],
    ratings: [8.6, 4.5, 9.0],
    cast: ["Jodie Foster", "Anthony Hopkins", "Scott Glenn"],
  },
  {
    title: "The Lord of the Rings: The Return of the King",
    director: "Peter Jackson",
    releaseYear: 2003,
    genres: ["Action", "Adventure", "Drama"],
    ratings: [8.9, 4.7, 9.5],
    cast: ["Elijah Wood", "Viggo Mortensen", "Ian McKellen"],
  },
  {
    title: "The Departed",
    director: "Martin Scorsese",
    releaseYear: 2006,
    genres: ["Crime", "Drama", "Thriller"],
    ratings: [8.5, 4.6, 9.1],
    cast: ["Leonardo DiCaprio", "Matt Damon", "Jack Nicholson"],
  },
  {
    title: "Gladiator",
    director: "Ridley Scott",
    releaseYear: 2000,
    genres: ["Action", "Adventure", "Drama"],
    ratings: [8.5, 4.7, 9.0],
    cast: ["Russell Crowe", "Joaquin Phoenix", "Connie Nielsen"],
  },
  {
    title: "The Green Mile",
    director: "Frank Darabont",
    releaseYear: 1999,
    genres: ["Crime", "Drama", "Fantasy"],
    ratings: [8.6, 4.6, 9.2],
    cast: ["Tom Hanks", "Michael Clarke Duncan", "David Morse"],
  },
  {
    title: "Saving Private Ryan",
    director: "Steven Spielberg",
    releaseYear: 1998,
    genres: ["Drama", "War"],
    ratings: [8.6, 4.7, 9.3],
    cast: ["Tom Hanks", "Matt Damon", "Tom Sizemore"],
  },
  {
    title: "Inglourious Basterds",
    director: "Quentin Tarantino",
    releaseYear: 2009,
    genres: ["Adventure", "Drama", "War"],
    ratings: [8.3, 4.5, 9.1],
    cast: ["Brad Pitt", "Diane Kruger", "Eli Roth"],
  },
  {
    title: "The Prestige",
    director: "Christopher Nolan",
    releaseYear: 2006,
    genres: ["Drama", "Mystery", "Sci-Fi"],
    ratings: [8.5, 4.6, 9.0],
    cast: ["Christian Bale", "Hugh Jackman", "Scarlett Johansson"],
  },
  {
    title: "The Godfather: Part II",
    director: "Francis Ford Coppola",
    releaseYear: 1974,
    genres: ["Crime", "Drama"],
    ratings: [9.0, 4.7, 9.5],
    cast: ["Al Pacino", "Robert De Niro", "Robert Duvall"],
  },
  {
    title: "The Lion King",
    director: "Roger Allers",
    releaseYear: 1994,
    genres: ["Animation", "Adventure", "Drama"],
    ratings: [8.5, 4.6, 9.2],
    cast: ["Matthew Broderick", "Jeremy Irons", "James Earl Jones"],
  },
  {
    title: "The Big Lebowski",
    director: "Joel Coen",
    releaseYear: 1998,
    genres: ["Comedy", "Crime"],
    ratings: [8.1, 4.5, 8.9],
    cast: ["Jeff Bridges", "John Goodman", "Julianne Moore"],
  },
  {
    title: "Avatar",
    director: "James Cameron",
    releaseYear: 2009,
    genres: ["Action", "Adventure", "Fantasy"],
    ratings: [7.8, 4.4, 8.5],
    cast: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"],
  },
];
const connectToMongoDatabase = async (URI) => {
  try {
    const { db } = mongoose.connection;
    const connect = await mongoose.connect(URI);
    console.log("connected to " + mongo_HOST);
  } catch (err) {
    console.log("no connection to mongodb: ", err);
  }
};

const movieSchema = mongoose.Schema({
  title: {
    type: String,
  },
  director: {
    type: String,
  },
  releaseYear: {
    type: Number,
  },
  genres: {
    type: [String],
  },
  ratings: {
    type: [Number],
  },
  cast: {
    type: [String],
  },
});

const movieModel = mongoose.model("Movies", movieSchema);
await connectToMongoDatabase(mongo_HOST);
const movieCollection = await movieModel.createCollection();
movieCollection.insertMany(sampleMovies);
export default movieModel;
console.log("we ran it");
// if (import.meta.url === `file://${process.argv[1]}`) {

// }
