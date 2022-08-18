// const { client } = require("./mongo");
// // const assert = require("assert");

// const searchMovies = async (body) => {
//   const { searchText, target } = body;
//   await client.connect();
//   DEBUG && console.log(searchText);
//   const cursor = client.db("sample_mflix").collection("movies");
//   //.find({ title: { $regex: `${searchText}`, $options: "i" } });
//   //.find({ $text: { $search: `"${searchText}"` } });
//   if (target === "movie") {
//     var agg = [
//       {
//         $search: {
//           index: "searchBar",
//           compound: {
//             should: [
//               {
//                 autocomplete: {
//                   query: `${searchText}`,
//                   path: "fullplot",
//                   fuzzy: { maxEdits: 1, prefixLength: 4, maxExpansions: 100 },
//                 },
//                 autocomplete: {
//                   query: `${searchText}`,
//                   path: "title",
//                   fuzzy: { maxEdits: 1, prefixLength: 3, maxExpansions: 100 },
//                 },
//               },
//             ],
//           },
//         },
//       },
//     ];
//   } else {
//     var agg = [
//       {
//         $search: {
//           index: "searchBar",
//           compound: {
//             should: [
//               {
//                 autocomplete: {
//                   query: `${searchText}`,
//                   path: "cast",
//                   fuzzy: { maxEdits: 1, prefixLength: 4, maxExpansions: 100 },
//                 },
//               },
//             ],
//           },
//         },
//       },
//     ];
//   }

//   const results = await cursor.aggregate(agg).toArray();
//   console.log(results);
//   DEBUG && console.log("Total results:", results.length);

//   return results;
// };

// module.exports = { searchMovies };
