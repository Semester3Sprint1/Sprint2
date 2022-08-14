const { client } = require("./mongo");

const searchMovies = async (body) => {
  const { searchText } = body;
  await client.connect();
  const cursor = client
    .db("sample_mflix")
    .collection("movies")
    .find({ $text: { $search: `"${searchText}"` } });
  const results = await cursor.toArray();
  DEBUG && console.log(results);
  DEBUG && console.log("Total results:", results.length);

  return results;
};

module.exports = { searchMovies };
