import chokidar from 'chokidar'
import fs from 'fs'
import path from 'path'

import format from 'prettier-eslint';

const { resolve } = path

export default () => {
    console.log('文件监听111')
    return {
        name: 'file-change',
        apply: 'serve',
        async configureServer(server) {
            console.log('测试')
            const baseDirUrl = resolve(__dirname, '../src/directives')
            const watcher = chokidar.watch(baseDirUrl, {
                interval: 500,
                persistent: true
            })
            function handler(path, stats) {
                console.log('文件监听222', 'path--', path, 'stats', stats)

                const exclude = ['index.js']
                if (exclude.includes(path)) return
                // 获取 directives 目录下除了index.js文件外的文件

                fs.readdir(baseDirUrl, async (err, files) => {
                    console.log('目录为--', files)
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
                        
                        fs.writeFile(resolve(baseDirUrl, '/index.js'), data, err => {
                            if (!err) console.log('写入成功')
                        })
                    } catch(e) {
                        console.log('格式化代码错误', e)
                    } 
                })

            }
            watcher.on('add', handler).
            on('change', handler).
            on('unlink', handler)
        }
    }
}
