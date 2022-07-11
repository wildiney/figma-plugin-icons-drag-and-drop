// This file isn't required to run the plugin.
// It's used only to generate the json file list for the ui.html

const path = require("path")
const fs = require("fs")

const rootPath = path.join(__dirname, 'icons')

function getFilePath (directory) {
  const paths = []
  const files = fs.readdirSync(directory)
  files.forEach((file) => {
    const directoryPath = path.join(directory, file)
    paths.push(directoryPath)
  })
  return paths
}

(async () => {
  const json = []
  const categories = []
  const files = getFilePath(rootPath)

  files.forEach((file) => {
    categories.push(file.split("\\").pop())
  })

  categories.forEach((category) => {
    const folder = path.join(rootPath, category)
    const files = getFilePath(folder)
    const icons = files.map((file) => {
      console.log(file)
      try {
        const code = fs.readFileSync(file)
        const name = file.split("\\").pop()
        const tags = []
        category.replace('&', '').replace('  ', ' ').split(" ").forEach((category) => {
          tags.push(category.toLowerCase())
        })

        name.replace('&', '').replace(".svg", "").replace("-", " ").split(" ").forEach((name) => {
          tags.push(name.toLowerCase())
        })
        return { name: name, file: code.toString(), tags: tags }
      } catch (e) {
        console.log(e)
      }
    })
    json.push({ category: category, icons: icons })
  })

  console.log(json)
  fs.writeFileSync('icons.json', JSON.stringify(json), { flag: 'w+' })
})()

