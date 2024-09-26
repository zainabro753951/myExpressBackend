const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database and collection name
const dbName = "e-com";
const collectionName = "PersonalInfo";

let dbConnect = async () => {
  let result = await client.connect();
  let db = result.db(dbName);
  return db.collection(collectionName);
};

module.exports = dbConnect;
