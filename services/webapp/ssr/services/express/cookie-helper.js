import millisecond from 'millisecond'
import cookieParser from 'cookie-parser'
import { EXPRESS_MIDDLEWARE } from './hooks'

export const cookieHelper = ({ scope, duration }) =>
    (req, res, next) => {
        const isDev = [ 'development', 'test' ].indexOf(process.env.NODE_ENV) !== -1

        const options = {
            app: {
                httpOnly: true,
                secure: !isDev,
                maxAge: millisecond(duration),
            },
            client: {
                maxAge: millisecond(duration),
            },
        }

        const getAppName = name => `${scope || 'xxx'}::${name}`
        const getClientName = name => `${scope || 'xxx'}--${name}`

        // App Cookie
        res.setAppCookie = (name, content) => res.cookie(getAppName(name), content, options.app)
        req.getAppCookie = name => req.cookies[getAppName(name)]
        res.deleteAppCookie = name => res.clearCookie(getAppName(name))

        // Client Cookie
        res.setClientCookie = (name, content) => res.cookie(getClientName(name), content, options.client)
        req.getClientCookie = name => req.cookies[getClientName(name)]
        res.deleteClientCookie = name => res.clearCookie(getClientName(name))

        next()
    }

export const register = ({ registerAction }) =>
    registerAction({
        hook: EXPRESS_MIDDLEWARE,
        name: '→ express/cookie-helper',
        trace: __filename,
        handler: async ({ app, settings }) => {
            app.use(cookieParser())
            app.use(cookieHelper(settings.cookieHelper))
        },
    })
