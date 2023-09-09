import fs from 'fs'
import path from 'path'
const { resolve } = path
import format from 'prettier-eslint'

const baseDirUrl = resolve(__dirname, '../src/store/modules')

const handler = (path, stats) => {
  console.log('store-watch files-', 'path-', path, 'stats', stats)

  fs.readdir(baseDirUrl, async (err, files) => {
    console.log('catalogue--', files)
    let pathArr = []
    let importArr = []
    let exportObj = []
    files.forEach((file) => {
      if (file !== 'index.js' && file.endsWith('.js')) {
        const str = file.replace('.js', '')
        const name = `use${str.charAt(0).toUpperCase() + str.slice(1)}Store`
        pathArr.push(str)
        importArr.push(`import ${name} from './modules/${str}'`)
        exportObj.push(name)
      }
    })

    try {
      const data = await format({
        text: importArr.join('\n') + '\n\n' + 'export {\n' + exportObj.join(',\n') + '\n}',
        semi: false
      })

      const namespaceData = await format({
        text: `export const Names = {${pathArr
          .map((str) => str + ':' + "'" + str + "'")
          .join(',')}}`,
        semi: false
      })

      fs.writeFile(resolve(__dirname, '../src/store/index.js'), data, (err) => {
        if (!err) console.log('store-write successfully')
      })
      fs.writeFile(resolve(__dirname, '../src/store/namespace.js'), namespaceData, (err) => {
        if (!err) console.log('store-write successfully')
      })
    } catch (e) {
      console.log(e)
    }
  })
}

export default {
  baseDirUrl,
  handler
}
