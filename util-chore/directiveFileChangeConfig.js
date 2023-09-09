import fs from 'fs'
import path from 'path'
const { resolve } = path
import format from 'prettier-eslint';

const baseDirUrl = resolve(__dirname, '../src/directives')

const handler = (path, stats) => {
    console.log('directive-watch files-', 'path-', path, 'stats', stats)

    fs.readdir(baseDirUrl, async (err, files) => {
        console.log('catalogue--', files)
        const importArr = []
        const exportObj = []
        files.forEach(file => {
            if (file !== 'index.js' && file.endsWith('.js')) {
                const str = file.replace('\.js', '')
                importArr.push(`import ${str} from './${str}'`)
                exportObj.push(str)
            }
        })

        try {
            const data = await format({
                text: importArr.join('\n') + '\n\n' + 'export default {\n' +exportObj.join(',\n') + '\n}',
                semi: false, 
            })
            
            fs.writeFile(resolve(__dirname, '../src/directives/index.js'), data, err => {
                if (!err) console.log('write successfully')
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