#!/usr/bin/env node

import { exec } from "child_process";
const dirName = process.argv[2];

exec(`mkdir ${dirName}`);
