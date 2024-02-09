import prompt from "prompt-sync";
import mongoose, { mongo } from "mongoose";
import {
  connectToMongoDatabase,
  mongo_HOST,
  movieModel,
} from "./create-database.js";
await connectToMongoDatabase(mongo_HOST);
const p = prompt();
let activeProgram = true;
let movieCollection = await movieModel.collection;
let startupMessage =
  "\nWelcome to the movies database!\nUse numbers 1-5 to navigate:\n ";
let navigationMessage =
  "\n1. View all movies\n2. Add a new movie\n3. Update exisiting movie(see for more options)\n4. Delete an exisiting movie\n5. Exit";
console.log(startupMessage);

const retrieveMovies = async (limit, filter) => {
  try {
    let cursor = await movieCollection.find({}).limit(limit).toArray();
    console.log(cursor.length);
    await cursor.forEach((movie) => {
      console.log(movie);
    });
  } catch (err) {
    console.log(err);
  }
};
const updateMovie = async () => {
  let startDecision = false;
  while (!startDecision) {
    console.log(
      "\nPlease use the title of the entry you wish to update:\nTo find the title of a movie in the collection, go back and choose option 1 in the navigationmenu.\n"
    );
    console.log(`\nContinue = "y"\nGo back to navigation = "menu"`);
    let startInput = p("");
    if (startInput === "y") {
      let updateDecision = false;
      while (!updateDecision) {
        console.log("\n Please enter title of movie:");
        let movieInput = p("");
        let movieToUpdate = await movieCollection.findOne({
          title: movieInput,
        });

        if (movieToUpdate) {
          console.log(movieToUpdate);
          console.log(
            `\nEnter what attributes you wish to update separated by spaces.\n Here is an example: "title genres director"\n`
          );
          let movieArr = p("").split(" ");
          const acceptedOptions = [
            "genres",
            "title",
            "director",
            "releaseYear",
            "ratings",
            "cast",
          ];
          let accept = true;
          for (const x of movieArr) {
            if (!acceptedOptions.includes(x)) {
              accept = false;
              break;
            }
          }
          if (movieArr.length > 0 && accept) {
            updateQuery(movieArr, movieToUpdate);
            updateDecision = true;
          } else {
            console.log("\nInvalid entry...");
            updateDecision = true;
          }
        } else {
          console.log("\nEntry not found\n");
          updateDecision = true;
        }
      }
    } else if (startInput === "menu") {
      startDecision = true;
    }
  }
};
const updateQuery = async (params, oldQuery) => {
  let updatedObject = { ...oldQuery };
  params.forEach((x) => {
    let helpMessage = `(CURRENT(${x})): ${oldQuery[x]}\nIf you wish to not change press ENTER without input.`;
    if (x === "title" || x === "director") {
      console.log(helpMessage);
      let userInput = p(``);
      if (userInput) {
        updatedObject[x] = userInput;
      }
    } else if (x === "releaseYear") {
      console.log(helpMessage);
      let userInput = p(``);
      if (isNaN(Number(userInput))) {
        while (isNaN(Number(userInput))) {
          console.log(
            "Entry needs to be a number, to skip press ENTER without input."
          );
          userInput = Number(p(""));
          if (userInput === "") break;
        }
      } else {
        updatedObject[x] = Number(userInput);
      }
    } else {
      console.log(
        helpMessage +
          "\n--When updating arrays the entries will be prompted one after another--"
      );
      updatedObject[x] = updatedObject[x].map((y, i) => {
        console.log(
          `Current item (${x}): ` + y + ` (${i + 1}/${updatedObject[x].length})`
        );
        let userInput = p("Update to: ");
        if (x === "ratings" && isNaN(userInput)) {
          console.log("Rating has to be a number, current value applied.");
          return y;
        } else if (userInput) {
          return userInput;
        } else {
          return y;
        }
      });
      console.log("FINISHED NEW: ", updatedObject[x]);
    }
  });
  let finalProductMessage = "";
  for (const x in updatedObject) {
    if (x === "_id") {
      continue;
    }
    finalProductMessage =
      finalProductMessage + `${x}: ${oldQuery[x]} -> ${updatedObject[x]}\n`;
  }
  let absoluteDecision = false;
  while (!absoluteDecision) {
    console.log(
      `These are the final changes:\n${finalProductMessage}Update data? (y/n)`
    );
    let absoluteAnswer = p("");
    if (absoluteAnswer === "y") {
      await movieCollection.replaceOne(
        { _id: updatedObject._id },
        updatedObject
      );
      console.log("Entry updated successfully!\n");
      absoluteDecision = true;
    } else if (absoluteAnswer === "n") {
      console.log("Changes discarded.\n");
      absoluteDecision = true;
    }
  }
};
const insertMovie = async () => {
  console.log(
    "You will now create a new entry into the collection.\n \nAssign value for each:"
  );
  let movieQuery = {
    title: "",
    director: "",
    releaseYear: 0,
    genres: [],
    ratings: [],
    cast: [],
  };
  for (const x in movieQuery) {
    if (x === "genres" || x === "ratings" || x === "cast") {
      let answer = "y";
      while (answer != "n") {
        if (answer === "y") {
          x != "ratings"
            ? movieQuery[x].push(p(`Enter ${x}: `))
            : movieQuery[x].push(Number(p(`Enter ${x}: `)));
        }
        console.log(`Enter one more (${x})? (y/n)\n`);
        answer = p("");
      }
    } else if (x === "releaseYear") {
      console.log(`Enter ${x}, please use numbers: \n`);
      let decided = false;
      while (!decided) {
        let yearInput = Number(p(""));
        if (isNaN(yearInput)) {
          console.log("Invalid entry, please use numbers: \n");
        } else {
          movieQuery[x] = yearInput;
          decided = true;
        }
      }
    } else {
      console.log(`Enter ${x}: \n`);
      movieQuery[x] = p("");
    }
  }
  console.log(
    `Ready to insert:\n${movieQuery.title}\n${movieQuery.director}\n${movieQuery.releaseYear}\n${movieQuery.genres}\n${movieQuery.ratings}\n${movieQuery.cast}\n`
  );
  let decided = false;
  while (!decided) {
    let decision = p("Insert into database? (y/n)");
    if (decision === "y") {
      try {
        await movieCollection.insertOne(movieQuery);
        console.log("Inserted new movie.");
      } catch (err) {
        console.log("Could not insert:", err);
      }
      decided = true;
    } else if (decision === "n") {
      decided = true;
    }
  }
};
const deleteMovie = async () => {
  let startDecision = false;
  while (!startDecision) {
    console.log(
      "Deleting an entry requires the title of the movie.\nTo show the current movies in the collection, go back and choose option 1 in the navigationmenu.\n"
    );
    console.log(
      `\nContinue to deletemenu = "y"\nGo back to navigation = "menu"`
    );
    let startInput = p("");
    if (startInput === "y") {
      let deleteDecision = false;
      while (!deleteDecision) {
        console.log(
          "\nPlease enter the title of the entry you wish to delete:"
        );
        let deleteInputTitle = p("");
        let movieByTitle = await movieCollection.findOne({
          title: deleteInputTitle,
        });
        if (movieByTitle) {
          console.log(movieByTitle);
          console.log("This entry was found.");
          console.log(
            "\n Do you wish to delete this entry from the collection? (y/n)"
          );
          let finalInput = p("");
          let finalDecision = false;
          while (!finalDecision) {
            if (finalInput === "y") {
              await movieCollection.deleteOne({ _id: movieByTitle._id });
              finalDecision = true;
              deleteDecision = true;
              console.log(
                `\n${movieByTitle.title} was successfully deleted from the collection.`
              );
            } else if (finalInput === "n") {
              finalDecision = true;
              deleteDecision = true;
              console.log(`\n${movieByTitle.title} kept in collection.\n`);
            }
          }
        }
      }
    } else if (startInput === "menu") {
      startDecision = true;
    }
  }
};
const logoutApp = () => {
  while (!activeProgram) {
    console.log("\nAre you sure you want to quit? (y/n)");
    let input = p("");
    if (input != "y") {
      console.log("start");
      activeProgram = true;
      windowApp();
    } else {
      console.log("\n\nWe are done! CTRL + c will exit node :)");
      break;
    }
  }
};
const windowApp = async () => {
  while (activeProgram) {
    console.log(navigationMessage);
    let input = p("Let's Go:");
    if (input > 0 && input <= 5) {
      switch (input) {
        case "1": {
          let cursor = await movieCollection.find({}).toArray();
          let l = cursor.length;
          console.log(
            `There is a total of ${l} movies to show.\n\nTo see all movies enter "all", otherwise enter a number 1-${String(
              l
            )}\n\nEnter "menu" to go back to navigation.`
          );
          let limitInput = p("");
          limitInput === "all" && (limitInput = l);
          if (Number(limitInput) > 0 && Number(limitInput) <= l) {
            await retrieveMovies(Number(limitInput));
          } else if (limitInput === "menu") {
            break;
          }
          break;
        }
        case "2": {
          await insertMovie();
          break;
        }
        case "3": {
          await updateMovie();
          break;
        }
        case "4": {
          await deleteMovie();
          break;
        }
        case "5": {
          activeProgram = false;
          logoutApp();
          break;
        }
      }
    }
  }
};
windowApp();
