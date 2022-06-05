import * as fs from "fs";

//* __dirname workaround for ESM ----------------------------------
import * as url from "url";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
//* ---------------------------------------------------------------

export default (vars) => {
  //* Build the package.json file
  //! Note the difference in the "bin" key
  //* If the command name is the same as the package name,
  //* This wil result in duplicate "bin" keys in the generated package.json
  //* We create the package.json file manually to circumvent this issue
  let templatePackageJSON =
    vars.name === vars.command
      ? `
  {
    "name": "{{name}}",
    "description": "{{description}}",
    "version": "{{version}}",
    "license": "{{license}}",
    "type": "module",
    "bin": {
      "{{name}}": "index.js"
    },
    "author": {
      "name": "{{authorName}}",
      "email": "{{authorEmail}}",
      "url": "{{authorURL}}"
    }
  }`
      : `
  {
    "name": "{{name}}",
    "description": "{{description}}",
    "version": "{{version}}",
    "license": "{{license}}",
    "type": "module",
    "bin": {
      "{{name}}": "index.js",
      "{{command}}": "index.js"
    },
    "author": {
      "name": "{{authorName}}",
      "email": "{{authorEmail}}",
      "url": "{{authorURL}}"
    }
  }`;

  fs.writeFile(
    __dirname + "/../template/package.json",
    templatePackageJSON,
    (err) => {
      if (err) console.log(error);
    }
  );
};
