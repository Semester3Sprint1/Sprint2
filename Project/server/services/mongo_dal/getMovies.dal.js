const { client } = require("./mongo");

const getMovies = async (body) => {
  const { page_number, page_size } = body;
  await client.connect();
  const cursor = await client
    .db("sample_mflix")
    .collection("movies")
    .find({ genres: "Action" })
    .skip(page_number * page_size)
    .limit(page_size);
  const results = await cursor.toArray();

  return results;
};

const getMoviesByGenre = async (body) => {
  const { page_number, page_size, genre } = body;
  await client.connect();
  const cursor = await client
    .db("sample_mflix")
    .collection("movies")
    .find({ genres: genre })
    .skip(page_number * page_size)
    .limit(page_size);
  const results = await cursor.toArray();

  return results;
};

module.exports = { getMovies, getMoviesByGenre };

// const getMovies = async () => {
//     //   const { searchText } = body;
//     await client.connect();
//     const collection = await client.db("sample_mflix").collection("movies");

//     const pipeline = [
//       {
//         $project: {
//           title: 1,
//         },
//       },
//     ];

//     const agg = await collection.aggregate(pipeline).toArray();

//     //const results = await collection.toArray();
//     console.log(agg);
//     return agg;
//   };
