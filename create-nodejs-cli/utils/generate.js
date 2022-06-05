import path from "path";
import copy from "copy-template-dir";
import alert from "cli-alerts";
import ask from "./questions.js";
import chalk from "chalk";
import * as fs from "fs";
import { readFileSync } from "fs";
// import { execa } from "execa";

const g = chalk.green;
const d = chalk.dim;

//* __dirname and __filename workaround for ESM -------------------
import * as url from "url";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

// const templateURL = new URL("../template/package.json", import.meta.url);
// const templatePkg = JSON.parse(readFileSync(templateURL));
//* ---------------------------------------------------------------

export default async () => {
  const vars = await ask();

  //* Build JSON without command
  //* Check if command is the same as name
  //* if not, add the command into the `bin` object
  //* if so, do nothing
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

  // if (vars.name !== vars.command) {
  //   JSON.parse((templatePackageJSON.bin["{{command}}"] = "index.js"));
  // }
  console.log(templatePackageJSON);

  fs.writeFile(
    __dirname + "/../template/package.json",
    templatePackageJSON,
    (err) => {
      if (err) console.log(error);
    }
  );

  //* Need to remove the duplicate so that
  //? the generated package.json does not have duplicate keys
  //TODO: try the two package.json file approach (choose which one to use depending on if name === command)
  //TODO: Or, generate the package.json based on the responses
  //TODO: (instead of having the packge.json predefined, build it here)

  //TODO: or, you could even use the Snippet feature of enquirer to make the JSON file
  // if (vars.name === vars.command) {
  //   templatePkg.bin["{{command}}"] && delete templatePkg.bin["{{command}}"];
  //   console.log(templatePkg);
  //   fs.writeFile(
  //     __dirname + "/../template/package.json",
  //     JSON.stringify(templatePkg),
  //     (err) => {
  //       if (err) {
  //         console.log(err);
  //       }
  //     }
  //   );
  // }

  const outputDir = vars.name;

  //* __dirname is the directory of this file
  const inDirPath = path.join(__dirname, `../template`);

  //* process.cwd() is the directory where this CLI command is run from
  const outDirPath = path.join(process.cwd(), `${outputDir}`);

  copy(inDirPath, outDirPath, vars, async (err, createdFiles) => {
    if (err) throw err;

    console.log(d(`\nCreating files in ${g(`./${outputDir}`)} directory...\n`));

    createdFiles.forEach((filePath) => {
      //* Get the last portion of the path
      const fileName = path.basename(filePath);
      console.log(`${g(`CREATED`)} ${fileName}`);
    });

    //! This approach is not clearing duplicate keys in the package.json
    //! Leaving here in case it works in the future
    //! For now, we are manually modifying package.json if there are duplicate values
    //? we need to run a command within the output folder
    // process.chdir(outDirPath);
    // * run 'npm dedupe', in case the command name is the same as the CLI name
    // await execa(`npm`, [`dedupe`]);

    alert({
      type: `success`,
      name: ` ALL DONE `,
      msg: g(
        `\n\n${createdFiles.length} files created in ./${d(
          outputDir
        )} directory`
      ),
    });
  });
};
