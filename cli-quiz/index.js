#!/usr/bin/env -S node --no-warnings

/**
 *
 * cli-quiz
 * CLI for taking a technical quiz
 * @author Sharif Elkassed <https://saleshorse.org>
 *
 */
import Enquirer from 'enquirer'
const { Quiz } = Enquirer

import init from './utils/init.js'
import cli from './utils/cli.js'
import log from './utils/log.js'

const input = cli.input
const flags = cli.flags
const { clear, debug } = flags

;(async () => {
  init({ clear })

  input.includes(`help`) && cli.showHelp(0)

  const prompt = new Quiz({
    message: `How do you hide a div in CSS?`,
    choices: [
      `display: table`,
      `display: none`,
      `display:hide`,
      `display: flex`,
    ],
    correctChoice: 1,
  })

  prompt
    .run()
    .then((answer) => {
      if (answer.correct) {
        console.log(`Correct!`)
      } else {
        console.log(`Wrong! The correct answer is ${answer.correctAnswer} `)
      }
    })
    .catch(console.error)

  debug && log(flags)
})()
