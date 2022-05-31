#!/usr/bin/env node

import { spawn } from "child_process";

const lsCommand = spawn("ls");

lsCommand.stdout.on("data", (data) => {
  console.log(`DATA FROM CHILD PROCESS: \n${data}`);
});
