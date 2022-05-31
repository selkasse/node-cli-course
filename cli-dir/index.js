#!/usr/bin/env node

import shell from "shelljs";
const exec = shell.exec;
const mkdir = shell.mkdir;

const dirName = process.argv[2];

// exec(`mkdir -p ${dirName}`);
mkdir(`-p`, dirName);
