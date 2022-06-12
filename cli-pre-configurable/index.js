#!/usr/bin/env -S node --no-warnings

/**
 *
 * cli-pre-configurable
 * A CLI that can be pre-configured with an .orc or config file
 * @author Sharif Elkassed <https://saleshorse.org>
 *
 */
import { cosmiconfig } from 'cosmiconfig'
import { readFileSync } from 'fs'

import init from './utils/init.js'
import cli from './utils/cli.js'
import log from './utils/log.js'

const fileURL = new URL('package.json', import.meta.url)
const pkgJSON = JSON.parse(readFileSync(fileURL))

const input = cli.input
const flags = cli.flags
const { clear, debug } = flags

;(async () => {
  init({ clear })

  input.includes(`help`) && cli.showHelp(0)

  const explorer = cosmiconfig(pkgJSON.name)
  const data = await explorer.search()
  //* Searches for a file that:
  //? 1. Begins with a dot (.)
  //? 2. The dot is follwed by the name of the package
  //? 3. The file name ends in
  //?   .rc
  //?   .js
  //?   ...etc (See documentation for more)
  //* For this package, examples are:
  //* .cli-pre-configurablerc
  //* .cli-pre-configurablerc.js
  //! (^-- seems to have some trouble with ESM)
  //* cli-pre-configurable.config.js (<-- seems to have some trouble with ESM)
  //! (^-- seems to have some trouble with ESM)
  console.log(`data:`, data)
  // console.log(`config:`, data.config)

  debug && log(flags)
})()
