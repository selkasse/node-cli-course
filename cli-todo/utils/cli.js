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
  view: { desc: `View or list all todos` },
  ls: { desc: `View or list all todos` },
  add: { desc: `Add a new todo` },
  del: { desc: `Delete selected todo(s)` },
  help: {
    desc: `Print help info`,
  },
}

const footer = makeFooter(`todo`, flags)

const helpText = meowHelp({
  name: `todo`,
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
