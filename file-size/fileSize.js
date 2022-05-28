const fs = require("fs");

function getFileSizeInBytes(filename) {
  const stats = fs.statSync(filename);

  //* Uncomment to see detailed file info
  //   console.log(stats);

  const fileSizeInBytes = stats["size"];
  return fileSizeInBytes;
}

//? __dirname is used to reference the directory of the file that is executing (this file)
console.log(getFileSizeInBytes(`${__dirname}/index.js`), `bytes`);
