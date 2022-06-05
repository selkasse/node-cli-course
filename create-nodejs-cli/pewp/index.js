#!/usr/bin/env -S node --no-warnings

/**
 *
 * pewp
 * lol it's shit
 * @author shit <shit>
 *
 */

import init from "./utils/init.js";
import cli from "./utils/cli.js";
import log from "./utils/log.js";

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

(async () => {
  init({ clear });

  input.includes(`help`) && cli.showHelp(0);

  debug && log(flags);
})();
