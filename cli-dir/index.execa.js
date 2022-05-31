#!/usr/bin/env node

import { exec } from "child_process";
import { stderr } from "process";
import execa from "execa";

//* Execute using child process
// const dirName = process.argv[2];
// exec(`mkdir -p ${dirName}`, dirCallback);

//* Execute using execa
(async () => {
  await execa(`mkdir`, [`-p`, dirName]);
})();
