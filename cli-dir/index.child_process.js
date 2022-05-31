#!/usr/bin/env node

import { exec } from "child_process";
import { stderr } from "process";
const dirName = process.argv[2];

const dirCallback = (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
};

exec(`mkdir -p ${dirName}`, dirCallback);
