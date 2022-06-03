#!/usr/bin/env -S node --no-warnings

//***********************************************
//*
//? {{name}}
//? {{description}}
//? @author {{description}}
//*
//***********************************************/

/**
 *
 * {{name}}
 * {{description}}
 * @author {{authorName}} <{{authorUrl}}>
 *
 */

import init from "./utils/init.js";
import cli from "./utils/cli.js";
import log from "./utils/log.js";

const input = cli.input;
const flags = cli.flags;

const { clear, debug } = flags(async () => {
  init({ clear });
})();
