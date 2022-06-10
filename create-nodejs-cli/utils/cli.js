import meow from 'meow'
import meowHelp from 'cli-meow-help'
import chalk from 'chalk'

const CLI_COMMAND = `ncli`
const NUM_EXAMPLES = 3

const flags = {
  clear: {
    type: `boolean`,
    default: true,
    alias: `c`,
    desc: `Clear the console`,
  },
  debug: {
    type: `boolean`,
    default: false,
    alias: `d`,
    desc: `Print debug info`,
  },
  version: {
    type: `boolean`,
    alias: `v`,
    desc: `Print CLI version`,
  },
}

const commands = {
  help: {
    desc: `Print help info`,
  },
}

let booleanExamples = []
//* Only add the flags that:
//? 1. Have a default
//? 2. The default is TRUE
Object.keys(flags).forEach((option) => {
  if (flags[option].type === 'boolean' && flags[option].default === true) {
    booleanExamples.push(option)
  }
})

let exampleString = `${chalk.green(`${CLI_COMMAND}`)} `
for (let i = 0; i < NUM_EXAMPLES; i++) {
  //* Do not add if booleanExamples.length is less than NUM_EXAMPLES
  if (booleanExamples[i]) {
    exampleString += `${chalk.yellow(`--no-${booleanExamples[i]}`)} `
  }
}

let footer = `${chalk.yellowBright.dim.inverse(` NOTE `)}`

footer += `\n\n${chalk.yellow(`--no`)} can be prepended to any boolean option`
footer += `\n(if the default value is ${chalk.dim.yellow(`true`)})`
footer += `\n\nThis will toggle the value to ${chalk.dim.yellow(`false`)}`
footer += `\n\n${chalk.yellowBright.dim.inverse(` EXAMPLE `)}\n\n`
footer += exampleString

const helpText = meowHelp({
  name: CLI_COMMAND,
  flags,
  commands,
  footer,
})

const options = {
  importMeta: import.meta,
  inferType: true,
  desccription: false,
  hardRejection: false,
  flags,
}

export default meow(helpText, options)
