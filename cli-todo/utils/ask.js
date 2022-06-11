import { to } from 'await-to-js'
import shouldCancel from 'cli-should-cancel'
import handleError from 'cli-handle-error'
import enquirer from 'enquirer'
const { Input } = enquirer

export default async ({ message }) => {
  const [err, response] = await to(
    new Input({
      message,
      validate(value) {
        return !value ? `Please add a value.` : true
      },
    })
      .on(`cancel`, () => shouldCancel())
      .run()
  )

  handleError(`INPUT: `, err)
  return response
}
