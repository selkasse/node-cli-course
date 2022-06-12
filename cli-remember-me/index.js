#!/usr/bin/env -S node --no-warnings

/**
 *
 * cli-remember-me
 * CLI that can persist some data
 * @author Sharif Elkassed <https://saleshorse.org>
 *
 */
import Conf from 'conf'
import Enquirer from 'enquirer'

import init from './utils/init.js'
import cli from './utils/cli.js'
import log from './utils/log.js'

const config = new Conf()
const { Input } = Enquirer

const input = cli.input
const flags = cli.flags
const { clear, debug } = flags

;(async () => {
  init({ clear })

  input.includes(`help`) && cli.showHelp(0)

  let name = config.get(`name`)

  if (!name) {
    const askName = await new Input({
      message: `Please enter your name`,
    }).run()

    config.set(`name`, askName)
    name = askName
  } else {
    console.log(`name:`, name)
  }

  debug && log(flags)
})()
