const { MongoClient } = require("mongodb");
const uri = process.env.URI; // replace this line in the .env with your own URI

const client = new MongoClient(uri);

module.exports = { client };
