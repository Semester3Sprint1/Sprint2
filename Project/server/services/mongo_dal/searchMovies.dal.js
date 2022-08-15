const { client } = require("./mongo");
// const assert = require("assert");

const searchMovies = async (body) => {
  const { searchText } = body;
  await client.connect();
  DEBUG && console.log(searchText);
  const cursor = client.db("sample_mflix").collection("movies");
  //.find({ title: { $regex: `${searchText}`, $options: "i" } });
  //.find({ $text: { $search: `"${searchText}"` } });
  const agg = [
    {
      $search: {
        index: "searchBar",
        compound: {
          should: [
            {
              autocomplete: {
                query: `${searchText}`,
                path: "title",
                fuzzy: { maxEdits: 2, prefixLength: 3, maxExpansions: 256 },
              },
              autocomplete: {
                query: `${searchText}`,
                path: "fullplot",
                fuzzy: { maxEdits: 1, prefixLength: 4, maxExpansions: 256 },
              },
            },
          ],
        },
      },
    },
    { $sort: { score: { $meta: "textScore" } } },
  ];

  const results = await cursor.aggregate(agg).toArray();
  DEBUG && console.log(results);
  DEBUG && console.log("Total results:", results.length);

  return results;
};

module.exports = { searchMovies };
