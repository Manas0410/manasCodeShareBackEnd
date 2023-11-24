import { closeConnection, connectToMongoDB } from "./connections";
import { insertCodeData } from "./schema";

console.log("manas");
const url = "mongodb://127.0.0.1:27017/";
const dbName = "manasCodeShareDatabaseName";

async function main() {
  try {
    const db = await connectToMongoDB(url, dbName);

    // Insert a book
    const newBook = {
      urlCode: "xcvb",
      sharedData: "manas code share",
    };
    // await insertCodeData(db, newBook);

    // await closeConnection();
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Execute main function
main();
