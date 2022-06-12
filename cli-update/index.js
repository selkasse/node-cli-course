#!/usr/bin/env -S node --no-warnings

/**
 *
 * cli-update
 * CLI that notifies you when an update is available
 * @author Sharif Elkassed <https://saleshorse.org>
 *
 */

import init from './utils/init.js'
import cli from './utils/cli.js'
import log from './utils/log.js'

const input = cli.input
const flags = cli.flags
const { clear, debug } = flags

;(async () => {
  init({ clear })

  input.includes(`help`) && cli.showHelp(0)

  debug && log(flags)
})()
