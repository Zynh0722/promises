/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var request = require('needle');
var Promise = require('bluebird');



var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TODO
  readFile = Promise.promisify(fs.readFile);
  writeFile = Promise.promisify(fs.writeFile);
  request = Promise.promisify(request);

  return readFile(readFilePath)
    .then(file => request(`https://api.github.com/users/${String(file).match(/(.+)\n/)[1]}`))
    .then(response => writeFile(writeFilePath, JSON.stringify(response.body)));
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
