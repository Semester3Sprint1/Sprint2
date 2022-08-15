const mongoose = require("mongoose");
const Joi = require("joi");

const searchSchema = new mongoose.Schema({
  searchText: {
    type: String,
    maxlength: 50,
  },
});

// searchSchema.methods.generateAuthToken = function () {
//   const token = jwt.sign({ _id: this._id }, process.env.KEY);
//   return token;
// };
const Search = mongoose.model("movies", searchSchema);

function validateSearch(search) {
  const schema = Joi.object({
    searchText: Joi.string().max(50).required(),
  });
  return schema.validate(search);
}

exports.Search = Search;
exports.validate = validateSearch;
