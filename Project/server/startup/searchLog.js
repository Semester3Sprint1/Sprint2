const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logSearch = async (user, searchText, results, database) => {
  const dateTime = `${format(new Date(), "yyyy-MM-dd  HH:mm:ss")}`;

  var searchItem = `${dateTime} \t ${user} \t "${searchText}" \t ${database} \t ${results} results found \t ${uuid()}\n`;

  DEBUG && console.log(searchItem);
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", "searchLog.log"),
      searchItem
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = { logSearch };
