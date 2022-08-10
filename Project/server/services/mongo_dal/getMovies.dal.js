const { client } = require("./mongo");

const getMovies = async (body) => {
  const { page_number, page_size } = body;
  // const sort = { title: 1 };
  await client.connect();
  const cursor = await client
    .db("sample_mflix")
    .collection("movies")
    .find()
    .skip(page_number * page_size)
    .limit(page_size);
  const results = await cursor.toArray();

  return results;
};

const getMoviesByGenre = async (body) => {
  const { page_number, page_size, genre } = body;
  const sort = { title: 1 };
  // console.log(`Page Num: ${page_number}`);
  await client.connect();
  const cursor = await client.db("sample_mflix").collection("movies");

  if (genre === "All") {
    var finder = cursor
      .find()
      .skip(page_number * page_size)
      .limit(page_size);
  } else {
    var finder = cursor
      .find({ genres: genre }, { sort })
      .skip(page_number * page_size)
      .limit(page_size);
  }

  const results = await finder.toArray();

  return results;
};

const getGenres = async () => {
  await client.connect();
  const cursor = await client
    .db("sample_mflix")
    .collection("movies")
    .distinct("genres");

  return cursor;
};

module.exports = { getMovies, getMoviesByGenre, getGenres };

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
