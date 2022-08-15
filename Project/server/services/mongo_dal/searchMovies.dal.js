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
                path: "fullplot",
                fuzzy: { maxEdits: 1, prefixLength: 4, maxExpansions: 100 },
              },
              autocomplete: {
                query: `${searchText}`,
                path: "title",
                fuzzy: { maxEdits: 1, prefixLength: 3, maxExpansions: 100 },
              },
            },
          ],
        },
      },
    },
    {
      $project: {
        _id: 0,
        title: 1,
        score: { $meta: "searchScore" },
      },
    },
    //{ $sort: { score: { $meta: "searchScore" } } },
  ];

  const results = await cursor.aggregate(agg).toArray();
  console.log(results);
  DEBUG && console.log("Total results:", results.length);

  return results;
};

module.exports = { searchMovies };
