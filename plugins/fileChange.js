import chokidar from 'chokidar'
import fs from 'fs'
import path from 'path'

import format from 'prettier-eslint';

const { resolve } = path

export default () => {
    return {
        name: 'file-change',
        apply: 'serve',
        async configureServer(server) {
            const baseDirUrl = resolve(__dirname, '../src/directives')
            const watcher = chokidar.watch(baseDirUrl, {
                interval: 500,
                persistent: true
            })
            function handler(path, stats) {
                console.log('watch files-', 'path-', path, 'stats', stats)

                const exclude = ['index.js']

                fs.readdir(baseDirUrl, async (err, files) => {
                    console.log('catalogue--', files)
                    let importArr = []
                    let exportObj = []
                    files.forEach(file => {
                        if (file !== 'index.js') {
                            const str = file.replace('\.js', '')
                            importArr.push(`import ${str} from './${str}'`)
                            exportObj.push(str)
                        }
                    })

                    try {
                        let data = await format({
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
            watcher.on('add', handler).
            on('change', handler).
            on('unlink', handler)
        }
    }
}
