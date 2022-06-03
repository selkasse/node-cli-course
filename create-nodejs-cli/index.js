#!/usr/bin/env -S node --no-warnings

import path from "path";

import copy from "copy-template-dir";
import chalk from "chalk";
import alert from "cli-alerts";

import init from "./utils/init.js";
import ask from "./utils/ask.js";

const g = chalk.green;
const d = chalk.dim;

//* __dirname and __filename workaround for ESM -------------------
import * as url from "url";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
//* ---------------------------------------------------------------

(async () => {
  init();

  const name = await ask({ message: `CLI Name?`, hint: `(kebab-case-only)` });
  const description = await ask({ message: `CLI Description?` });
  const version = await ask({ message: `CLI Version?`, initial: `0.0.1` });
  const license = await ask({ message: `CLI License?`, initial: `UNLICENSED` });
  const authorName = await ask({ message: `Author name?` });
  const authorEmail = await ask({ message: `Author email?` });
  const authorURL = await ask({ message: `Author URL?` });

  if (!name || !description || !version) {
    console.log(
      `Name, Description, and Version are required in order to generate output`
    );
    return;
  }

  const vars = {
    name,
    description,
    version,
    license,
    authorName,
    authorEmail,
    authorURL,
  };

  const outputDir = vars.name;

  //* __dirname is the directory of this index.js file
  const inDirPath = path.join(__dirname, `template`);

  //* process.cwd() is the directory where this CLI command is run from
  const outDirPath = path.join(process.cwd(), `${outputDir}`);

  copy(inDirPath, outDirPath, vars, (err, createdFiles) => {
    if (err) throw err;
    console.log(d(`\nCreating files in ${g(`./${outputDir}`)} directory...\n`));
    createdFiles.forEach((filePath) => {
      //* Get the last portion of the path
      const fileName = path.basename(filePath);
      console.log(`${g(`CREATED`)} ${fileName}`);
    });
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
})();
