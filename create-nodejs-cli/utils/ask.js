import * as fs from 'fs'
import enquirer from 'enquirer'
import { to } from 'await-to-js'
import handleError from 'cli-handle-error'
import shouldCancel from 'cli-should-cancel'
import datastore from 'data-store'
import path from 'path'

const { Input } = enquirer

//* __dirname workaround for ESM ----------------------------------
import * as url from 'url'
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
//* ---------------------------------------------------------------

export default async ({ name, message, hint, initial }) => {
  //* We do not want to persist the answers from all prompts
  //? Specifically, we do not want to persist any prompts with an initial value
  //? Additionally, it does not make sense to persist the name, command, or description
  let history = false
  if (
    !initial &&
    name !== `name` &&
    name !== `command` &&
    name !== `description`
  ) {
    history = {
      autosave: true,
      store: new datastore({
        path: path.join(__dirname, `/../.history/${name}.json`),
      }),
    }
  }
  const [err, response] = await to(
    new Input({
      name,
      message,
      hint,
      initial,
      history,
      validate(value, state) {
        // console.log(value)
        // console.log(state)
        //* Since the 'command' is optional,
        //?   do not require the user to enter a value
        if (state && state.name === `command`) return true

        //* Prevent execution if the folder already exists
        if (state && state.name === `name`) {
          if (fs.existsSync(value)) {
            return `Directory already exists: ./${value}`
          } else {
            return !value ? `Please add a value` : true
            // return true
          }
        }

        return !value ? `Please add a value` : true
      },
    })
      .on(`cancel`, () => shouldCancel())
      .run()
  )

  handleError(`INPUT`, err)

  return response
}
