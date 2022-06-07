import ask from './ask.js'

export default async () => {
  const name = await ask({
    name: `name`,
    message: `CLI Name?`,
    hint: `(kebab-case-only)`,
  })
  const command = await ask({
    name: `command`,
    message: `CLI command?`,
    hint: `(optional: if different from CLI name)`,
  })
  const description = await ask({
    name: `description`,
    message: `CLI Description?`,
  })
  const version = await ask({
    name: `version`,
    message: `CLI Version?`,
    initial: `0.0.1`,
  })
  const license = await ask({
    name: `license`,
    message: `CLI License?`,
    initial: `UNLICENSED`,
  })
  const authorName = await ask({ name: `authorName`, message: `Author name?` })
  const authorEmail = await ask({
    name: `authorEmail`,
    message: `Author email?`,
  })
  const authorURL = await ask({ name: `authorURL`, message: `Author URL?` })

  let vars = {
    name,
    command: command ? command : name,
    description,
    version,
    license,
    authorName,
    authorEmail,
    authorURL,
  }

  return vars
}
