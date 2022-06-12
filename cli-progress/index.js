#!/usr/bin/env -S node --no-warnings

/**
 *
 * cli-progress
 * CLI with progress bars
 * @author Sharif Elkassed <https://saleshorse.org>
 *
 */

import createLogger from 'progress-estimator'
import { join } from 'path'

//* __dirname workaround for ESM ----------------------------------
import * as url from 'url'
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
//* ---------------------------------------------------------------

//* All configuration keys are optional, but it's recommended
//* to specify a storage location
const logger = createLogger({
  storagePath: join(__dirname, '.progress-estimator'),
})

import init from './utils/init.js'
import cli from './utils/cli.js'
import log from './utils/log.js'

const input = cli.input
const flags = cli.flags
const { clear, debug } = flags

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

;(async () => {
  init({ clear })

  input.includes(`help`) && cli.showHelp(0)

  await logger(sleep(2000), `Doing something...`)

  debug && log(flags)
})()
