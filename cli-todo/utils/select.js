import { to } from 'await-to-js'
import shouldCancel from 'cli-should-cancel'
import handleError from 'cli-handle-error'
import enquirer from 'enquirer'
import chalk from 'chalk'
const dim = chalk.dim
const { MultiSelect } = enquirer

export default async ({ message, choices }) => {
  const [err, response] = await to(
    new MultiSelect({
      message,
      choices,
      hint: dim(`\nUse [space] to select and [enter] to submit\n`),
      validate(value) {
        return value.length === 0 ? `Please select at least one todo.` : true
      },
    })
      .on(`cancel`, () => shouldCancel())
      .run()
  )

  handleError(`INPUT: `, err)
  return response
}
