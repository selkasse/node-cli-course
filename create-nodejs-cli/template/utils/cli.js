import meow from 'meow'
import meowHelp from 'cli-meow-help'
import makeFooter from 'cli-footer'

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

const footer = makeFooter(`{{command}}`, flags)

const helpText = meowHelp({
  name: `{{command}}`,
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
