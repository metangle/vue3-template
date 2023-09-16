import fs from 'fs'
import path from 'path'
const { resolve } = path
import format from 'prettier-eslint';

const baseDirUrl = resolve(__dirname, '../src/components')

const handler = (path, stats) => {
    console.log('directive-watch files-', 'path-', path, 'stats', stats)

    fs.readdir(baseDirUrl, async (err, files) => {
        console.log('catalogue--', files)
        const importArr = []
        const exportObj = []
        files.forEach(file => {
            if (file !== 'index.js') {
                console.log('file--', file)
                // const str = file.replace('\.js', '')
                const str = file.replace('', '')
                importArr.push(`import ${str} from './${str}/index.vue'`)
                exportObj.push(str)
            }
        })

        try {
            const data = await format({
                text: importArr.join('\n') + '\n\n' + 'const components = {\n' +exportObj.join(',\n') + '\n}\n' + `export default {
                    install(app) {
                      for (let key of Object.keys(components)) {
                        app.component(` + '`' + 'u-' + '${key}'+ '`' + `, components[key])
                      }
                    }
                  }`,
                semi: false, 
            })
            
            fs.writeFile(resolve(__dirname, '../src/components/index.js'), data, err => {
                if (!err) console.log('components-write successfully')
            })
        } catch(e) {
            console.log(e)
        } 
    })

}

export default {
    baseDirUrl,
    handler
}