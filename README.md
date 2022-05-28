# NodeCLI Course Notes

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
  ## Use `npm version patch | minor | major` to increment CLI version
  
  ## Use `npm publish` after versioning
  
  ## Use `npx <your CLI name>` to run the published version

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
</details>

# Creating a module

<details>
  <summary>Click to expand</summary>
  
  ## It's a good idea to have the following files in your project
  - `package.json`: Make sure to install things like prettier as dev dependencies (`npm install prettier -D`)
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
