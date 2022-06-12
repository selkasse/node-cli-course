import { readFileSync } from 'fs'

import { UpdateNotifier } from 'update-notifier'
import welcome from 'cli-welcome'
import unhandled from 'cli-handle-unhandled'

const fileURL = new URL('../package.json', import.meta.url)
const pkg = JSON.parse(readFileSync(fileURL))

export default ({ clear = true }) => {
  unhandled()

  welcome({
    title: `cli-update`,
    tagLine: `by Sharif Elkassed`,
    description: pkg.description,
    version: pkg.version,
    bgColor: `#6cc24a`,
    color: `#000000`,
    bold: true,
    clear,
  })

  // UpdateNotifier({ pkg }).notify()
  //* Uncomment the line above for an actual package

  //* Use an outdated package to illustrate what UpdateNotifier does
  const notifier = new UpdateNotifier({
    pkg: {
      name: 'node',
      version: '10.0.0',
    },
    updateCheckInterval: 0,
  })
  // .notify()

  notifier.notify()
}
