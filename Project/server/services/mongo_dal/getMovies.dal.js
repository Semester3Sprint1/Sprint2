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

  if (genre === "All" || genre === "") {
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

const getRandomMovies = async () => {
  await client.connect();
  const coll = await client.db("sample_mflix").collection("movies");

  const agg = [
    {
      $sample: {
        size: 3,
      },
    },
    {
      $project: {
        title: 1,
        _id: 1,
        fullplot: 1,
        "imdb.rating": 1,
      },
    },
  ];

  const cursor = coll.aggregate(agg);
  const result = await cursor.toArray();

  return result;
};

const getBannerPics = async () => {
  await client.connect();
  const coll = await client.db("sample_mflix").collection("movies");

  const agg = [
    {
      $sample: {
        size: 50,
      },
    },
    {
      $project: {
        poster: 1,
      },
    },
  ];

  const cursor = coll.aggregate(agg);
  const result = await cursor.toArray();

  return result;
};

module.exports = { getMovies, getMoviesByGenre, getGenres, getBannerPics };

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
