import chokidar from 'chokidar'

export default (baseDirUrl, handler = () => {}) => {
    return {
        name: 'file-change',
        apply: 'serve',
        async configureServer(server) {
            const watcher = chokidar.watch(baseDirUrl, {
                interval: 500,
                persistent: true
            })
            watcher.on('add', handler).
            on('change', handler).
            on('unlink', handler)
        }
    }
}
