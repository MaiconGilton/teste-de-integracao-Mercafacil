import fs from 'fs'
import path from 'path'

const loadModules = app => {
    fs
        .readdirSync(__dirname, { withFileTypes: true })
        .filter(file => file.isDirectory())
        .forEach(folder => {
            folder = folder.name
            const currentDir = path.resolve(__dirname, folder)
            // console.log(folder)

            fs // export routes
                .readdirSync(currentDir)
                .filter(file => file.includes('routes'))
                .forEach(file => require(path.resolve(currentDir, file)).default(app))

            fs // export streams or scheduledJobs
                .readdirSync(currentDir)
                .filter(file => file.includes('stream') || file.includes('scheduledJobs'))
                .forEach(file => require(path.resolve(currentDir, file)))

            fs // export files in folders helpers and observer
                .readdirSync(currentDir, { withFileTypes: true })
                .filter(file => file.isDirectory())
                .forEach(folder => {
                    folder = folder.name
                    const _currentDir = path.resolve(currentDir, folder)

                    if (['helpers', 'observer'].includes(folder)) {
                        fs
                            .readdirSync(_currentDir)
                            .forEach(file => require(path.resolve(_currentDir, file)))
                    }
                })
        })
}

export default loadModules