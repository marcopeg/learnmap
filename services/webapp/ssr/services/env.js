/**
 * Extends `process.env` with informations from local files:
 *
 * .env
 * .env.local
 * .env.[development|production|...]
 * .env.[development|production|...].local
 *
 */

import { START, SERVICE } from '@marcopeg/hooks'
import path from 'path'
import fs from 'fs'
import nodeEnvFile from 'node-env-file'

const fileExists = filePath => new Promise((resolve, reject) => {
    fs.exists(filePath, exists => exists ? resolve(true) : resolve(false))
})

const loadEnv = async (fileName, root, options) => {
    const filePath = path.join(root, fileName)
    if (await fileExists(filePath)) {
        nodeEnvFile(filePath, options)
    }
}

const initEnv = async (args) => {
    const cwd = args.cwd || process.cwd()
    await loadEnv('.env', cwd)
    await loadEnv('.env.local', cwd, { override: true })
    await loadEnv(`.env.${process.env.NODE_ENV}`, cwd, { override: true })
    await loadEnv(`.env.${process.env.NODE_ENV}.local`, cwd, { override: true })
}

export const register = ({ registerAction }) =>
    registerAction({
        hook: START,
        name: `${SERVICE} env`,
        trace: __filename,
        handler: initEnv,
    })
