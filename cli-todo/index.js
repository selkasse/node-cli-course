#!/usr/bin/env -S node --no-warnings

/**
 *
 * cli-todo
 * CLI to manage todos anywhere
 * @author Sharif Elkassed <https://saleshorse.org>
 *
 */

import * as fs from 'fs'
import path from 'path'
import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync.js'
import makeDir from 'make-dir'
import alert from 'cli-alerts'
import chalk from 'chalk'
const g = chalk.green
const r = chalk.red
const y = chalk.yellow

//* Database
const dbTodos = path.join(process.cwd(), '.todo/todos.json')

import init from './utils/init.js'
import cli from './utils/cli.js'
import log from './utils/log.js'
import ask from './utils/ask.js'
import select from './utils/select.js'

const input = cli.input
const flags = cli.flags
const { clear, debug } = flags

;(async () => {
  init({ clear })

  input.includes(`help`) && cli.showHelp(0)

  if (!fs.existsSync(dbTodos)) {
    await makeDir(`.todo`)
    process.chdir(`.todo`)
    fs.writeFileSync(`todos.json`, `{}`)
  }

  const adapter = new FileSync(dbTodos)
  const db = low(adapter)
  db.defaults({ todos: [] }).write()

  //* COMMAND: todo view ('ls')
  if (input.includes(`view`) || input.includes(`ls`)) {
    const allTodos = db.get(`todos`).value()
    allTodos.map((todo, i) =>
      console.log(`${chalk.dim(`${++i}`)}: ${todo.title}`)
    )
    console.log(
      `\n${chalk.hex(`#fad000`).inverse(` TOTAL: `)} ${allTodos.length}\n`
    )
  }

  //* COMMAND: todo add
  if (input.includes(`add`)) {
    const newTodo = await ask({ message: `Add a todo` })
    db.get(`todos`).push({ title: newTodo }).write()
    alert({
      type: `success`,
      name: ` ADDED `,
      msg: `successfully`,
    })
  }

  //* COMMAND: todo del
  if (input.includes(`del`)) {
    const allTodos = db.get(`todos`).value()
    const toDels = await select({
      choices: allTodos,
      message: `Finish todos: `,
    })
    toDels.map((todoTitle) =>
      db.get(`todos`).remove({ title: todoTitle }).write()
    )

    alert({
      type: `success`,
      name: ` REMOVED `,
      msg: `${toDels.length} todos`,
    })
  }

  debug && log(flags)
})()
