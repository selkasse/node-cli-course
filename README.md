# NodeCLI Course Notes

## If `npx` is not executing the latest version of your package

```bash
rm -rf ~/.npm/_npx
```

# Creating a CLI

<details>
  <summary>Click to expand</summary>
  
  ## Make the file executable
  - Use `chmod +x index.js` to alter permissions
  - Add a shebang (`#!/usr/bin/env node`) to the top of the file
    - This tells the terminal to use node instead of bash
  ## Configure your `package.json` file
  ```js
  {
    "name": "sharif",      //* the name of the package on the npm registry
    "version": "1.0.0",
    "bin": {
      "sharif": "index.js" //* the name of the command to run
    }
  }
  ```
  ## Use `npm link` for local development
  - Creates a symlink from the project directory to the glboal installation
  - Makes it so that you can work on your CLI without always having to rebuild
  ## Use `npm unlink -g` to make sure you're using the **published** version
  - Can always run `npm link` again to switch back to development
  ## Use `npm version patch | minor | major` to increment CLI version
  ## Make sure you are logged into `npm` by running `npm whoami`
  - If you are not logged in, run `npm login`
  - If you have not registered with `npm`, run `npm adduser`
  ## Use `npm publish` after versioning
  - If you get an error saying you do not have permission to publish
    - This is likely because someone else has already published a package with the same name
  - To get around this issue, you can create a **scoped package**
  - A scoped package creates a package under a namespace, denoted with `@`
  - For example: `@myCompany/hello` will create a `hello` package that is scoped to `@myCompany`
  - **NOTE: Scoped packages are a paid feature**
    - However, if you publish with `npm publish --access public`, you can use a create a public scoped package for free
  ## Use `npx <your CLI name>` to run the published version

</details>

# Child Processes

<details>
  <summary>Click to expand</summary>

- [Child processes](https://nodejs.org/api/child_process.html) are subprocesses
- They can be spawned from within an exisiting node process
- Multiple child processes can be spawned within a single node process
- Each child process has its own input and output stream

## Example

- This child process runs the `ls` command from within the parent node process

```js
#!/usr/bin/env node

import { spawn } from "child_process";

const lsCommand = spawn("ls");

lsCommand.stdout.on("data", (data) => {
  console.log(`DATA FROM CHILD PROCESS: \n${data}`);
});
```

## [`child_process.exec(command[,options][,callback])`](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback)

- Runs commands that have the ability to modify your system
  - For example `mkdir`
  - Different from `ls`, since `ls` only prints data, whereas `mkdir` actually makes a folder
- Example: Creates a `utils` folder in the current directory, when the file is run

  ```js
  #!/usr/bin/env node

  import { exec } from "child_process";

  exec("mkdir utils");
  ```

</details>

# Useful Packages

<details>
  <summary>Click to expand</summary>
  
  - [`licensed`](https://www.npmjs.com/package/licensed)
    - Easily add a license to your project
  - [`conduct`](https://www.npmjs.com/package/conduct)
    - Easily add a Code of Conduct to your project
  - [`chalk`](https://www.npmjs.com/package/chalk)
    - Add colors to your console output
    - **NOTE:** Must `npm install chalk@4` to use with CommonJS
  - [`figlet`](https://www.npmjs.com/package/figlet)
    - Turn text into ASCII art
  - [`cli-welcome`](https://www.npmjs.com/package/cli-welcome)
    - Add a welcome message to your CLI
  - [`log-symbols`](https://www.npmjs.com/package/log-symbols)
    - Includes icon fallbacks for all Operating Sytems
      - ℹ️ Info icon
      - ✔️ Success icon
      - ⚠️ Warning icon
      - ❌ Error Icon
  - [`commander`](https://www.npmjs.com/package/commander)
    - API for creating options, flags, etc
  - [`oclif`](https://www.npmjs.com/package/oclif)
    - Framework for creating CLIs
  - [`sade`](https://www.npmjs.com/package/sade)
    - Similar to `commander`
  - [`gluegun`](https://www.npmjs.com/package/gluegun)
  - [`ink`](https://www.npmjs.com/package/ink)
    - Use React to build your CLI
  - [`yargs`](https://www.npmjs.com/package/yargs)
    - Node CLI arguments helper
  - [`arg`](https://www.npmjs.com/package/arg)
    - Created by Vecel
  - [`cac`](https://www.npmjs.com/package/cac)
    - Stands for 'Command and Conquer'
    - Written in Typescript
  - [`meow`](https://www.npmjs.com/package/meow)
    - Lightweight
    - Simple library, as opposed to an entire framework
  - [`ora`](https://www.npmjs.com/package/ora)
    - Add loading spinners to your CLI
  - [`boxen`](https://www.npmjs.com/package/boxen)
    - Add styled text boxes to your CLI
  - [`cli-striphtml`](https://www.npmjs.com/package/cli-strip-html)
    - Strip HTML
  - [`enquirer`](https://www.npmjs.com/package/enquirer)
    - Build styled CLI prompts for taking user input
  - [`prompts`](https://www.npmjs.com/package/prompts)
    - Similar to `enquirer`
  - [`execa`](https://www.npmjs.com/package/execa)
    - Improves `child_process` methods 
    - Promise-based (can `await` execution)
  - [`shelljs`](https://www.npmjs.com/package/shelljs)
    - Portable (Windows/Linux/macOS) implementation of Unix shell commands
  - [`cli-meow-help`](https://www.npmjs.com/package/cli-meow-help)
    - Generate and format help menus automatically
</details>

# Creating a module

<details>
  <summary>Click to expand</summary>
  
  ## It's a good idea to have the following files in your project
  - `package.json`: Make sure to install things like prettier as dev dependencies (`npm install prettier -D`)
    - `name`: should always be `lower-kebab-case`
    - `version`: should use [Semantic Versioning](https://semver.org/)
    - `repository`: keep it simple -- `selkasse/my-cool-cli`
    - `author`: example:
       ```json
      {
        "author": "Sharif Elkassed",
        "email": "selkasse@gmu.edu",
        "url": "https://saleshorse.org"
      }
        ```
    - `main`: entry point of the package (usually `index.js`)
    - `files`: an array of file names that specifies which files are used in the node module 
       - Note that if you include a folder, all files in the folder will be included
       ```js
       "files": ["index.js"]
       ```
    - `keywords`: indicate what users should search in the npm registry to find your package
    - `devDependencies`: packages like `prettier` that are only used in development
      - no need to manually add to this key
        - `devDependencies` will be automatically updated when you `npm install <package> -D`
  - `test.js`: Mock the execution of your program
    - ```js
      // require the local file instead of the actual npm package
      const alert = require('./index.js')

      alert({
        type: `success`,
        msg: `All done!`
      })
      ```

- `.prettierrc`: Configure specifically for your node module (no global config)
- `.npmrc`: Set `package-lock=false` since this is a production-ready package
- `.gitignore`: Avoid committing `node_modules`, etc
- `.gitattributes`: Set options such as `eol`
- `.editorconfig`: Optional -- contains things like charset, tabs vs spaces, etc

## Creating a Code of Conduct

- Run `npx conduct` to create a code of conduct markdown file in your project

## Creating a License

- Run `npx licensed MIT` to create a MIT license for your module

</details>
