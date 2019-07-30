// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
const express = require("express");

const app = express();

//load the quotes JSON
const Quotes = require("./quotes.json");
const lodash = require("lodash");
const cors = require("cors");
app.use(cors());
// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)
app.get("/", function(request, response) {
  response.send("Neill's Quote Server!  Ask me for /quotes/random, or /quotes");
});

//START OF YOUR CODE...
app.get("/quotes", (req, res) => {
  res.send(Quotes);
});
app.get("/quotes/random", (req, res) => {
  // var randomquotes = pickFromArray(Quotes);
  var randomquotes = lodash.sample(Quotes);
  res.send(randomquotes);
});

app.get("/quotes/search", (req, res) => {
  var searchKeys = Object.keys(req.query);
  var fileredQuotes = Quotes;
  searchKeys.forEach(keyName => {
    if (req.query[keyName].length > 0) {
      fileredQuotes = fileredQuotes.filter(obj =>
        obj[keyName].toLowerCase().includes(req.query[keyName].toLowerCase())
      );
    }
  });
  res.send(fileredQuotes);
});
// function findQuotesMatching(quotes, searchTerm) {
//   return quotes.filter(
//     element => element.quote.toLowerCase().includes(searchTerm.toLowerCase()))
// }
//...END OF YOUR CODE

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

//Start our server so that it listens for HTTP requests!
const listener = app.listen(process.env.PORT || 3000, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
