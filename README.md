# NodeCLI Course Notes

# Creating a CLI

<details>
  <summary>Click to expand</summary>
  
  ## To make the file executable
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

</details>

# Creating an npm package (module)

<details>
  <summary>Click to expand</summary>
  
  ## It's a good idea to have the following files in your project
  - `package.json`: Make sure to install things like prettier as dev dependencies (`npm install prettier -D`)
  - `.prettierrc`: Configure specifically for your node module (no global config)
  - `.npmrc`: Set `package-lock=false` since this is a production-ready package
  - `.gitignore`: Avoid committing `node_modules`, etc
  - `.gitattributes`: Set options such as `eol`
  - `.editorconfig`: Optional -- contains things like charset, tabs vs spaces, etc
  ## Creating a Code of Conduct
  - Run `npx conduct` to create a code of conduct markdown file in your project
  ## Creating a License
  - Can `npm install licensed`
  - Then, run `licensed` and fill out the prompts

</details>
