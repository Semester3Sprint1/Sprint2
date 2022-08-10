const { client } = require("./mongo");

const searchMovies = async (body) => {
  const { searchText } = body;
  await client.connect();
  const cursor = client
    .db("sample_mflix")
    .collection("movies")
    .find({ $text: { $search: searchText } });
  const results = await cursor.toArray();
  console.log(results);

  return results;
};

module.exports = { searchMovies };
