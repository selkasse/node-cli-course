# NodeCLI Course Notes

# A collapsible section with markdown

<details>
  <summary>Click to expand!</summary>
  
  ## Heading
  1. A numbered
  2. list
     * With some
     * Sub bullets
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
