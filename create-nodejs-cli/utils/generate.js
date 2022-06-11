import path from 'path'
import copy from 'copy-template-dir'
import alert from 'cli-alerts'
import ask from './questions.js'
import chalk from 'chalk'
import ora from 'ora'
import { execa } from 'execa'

const g = chalk.green
const d = chalk.dim
const y = chalk.yellow

const spinner = ora({ text: `` })

//* __dirname workaround for ESM ----------------------------------
import * as url from 'url'
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
//* ---------------------------------------------------------------

export default async () => {
  const vars = await ask()

  const outputDir = vars.name

  //* __dirname is the directory of this file
  const inDirPath = path.join(__dirname, `../template`)

  //* process.cwd() is the directory where this CLI command is run from
  const outDirPath = path.join(process.cwd(), `${outputDir}`)

  copy(inDirPath, outDirPath, vars, async (err, createdFiles) => {
    if (err) throw err

    console.log(d(`\nCreating files in ${g(`./${outputDir}`)} directory...\n`))

    createdFiles.forEach((filePath) => {
      //* Get the last portion of the path
      const fileName = path.basename(filePath)
      console.log(`${g(`CREATED`)} ${fileName}`)
    })

    console.log()
    spinner.start(
      `${y(`DEPENDENCIES`)} installing...\n\n${d(`It may take a moment...`)}`
    )
    process.chdir(outDirPath)

    const packages = [
      `meow`,
      `chalk`,
      `cli-alerts`,
      `cli-footer`,
      `cli-welcome`,
      `cli-meow-help`,
      `cli-handle-error`,
      `cli-handle-unhandled`,
    ]

    await execa(`npm`, [`install`, ...packages])
    await execa(`npm`, [`install`, `prettier`, `-D`])
    await execa(`npm`, [`dedupe`])
    spinner.succeed(`${g(`DEPENDENCIES`)} installed!`)

    alert({
      type: `success`,
      name: ` ALL DONE `,
      msg: g(
        `\n\n${createdFiles.length} files created in ./${d(
          outputDir
        )} directory`
      ),
    })
  })
}
