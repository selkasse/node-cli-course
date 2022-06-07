import * as fs from 'fs'
import enquirer from 'enquirer'
import { to } from 'await-to-js'
import handleError from 'cli-handle-error'
import shouldCancel from 'cli-should-cancel'

const { Input } = enquirer

export default async ({ name, message, hint, initial }) => {
  const [err, response] = await to(
    new Input({
      name,
      message,
      hint,
      initial,
      validate(value, state) {
        //* Since the 'command' is optional,
        //?   do not require the user to enter a value
        if (state && state.name === `command`) return true

        //* Prevent execution if the folder already exists
        if (state && state.name === `name`) {
          if (fs.existsSync(value)) {
            return `Directory already exists: ./${value}`
          } else {
            return true
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
