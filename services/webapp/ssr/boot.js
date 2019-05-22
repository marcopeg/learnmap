import { registerAction, SETTINGS, FINISH } from '@forrestjs/hooks'
import { createHookApp, logBoot } from '@forrestjs/hooks'
import * as config from '@marcopeg/utils/lib/config'

// polyfill "fetch" in NodeJS
require('es6-promise').polyfill()
require('isomorphic-fetch')

const features = [
    require('./features/auth'),
]

const services = [
    require('@forrestjs/service-env'),
    require('@forrestjs/service-logger'),
    require('@forrestjs/service-jwt'),
    require('@forrestjs/service-hash'),
    require('@forrestjs/service-postgres'),
    require('@forrestjs/service-express'),
    require('@forrestjs/service-express-graphql'),
    require('@forrestjs/service-express-cookies'),
    require('@forrestjs/service-express-ssr'),
    require('@forrestjs/feature-locale'),
]

registerAction({
    hook: SETTINGS,
    name: '♦ boot',
    handler: async ({ settings }) => {
        settings.postgres = [{
            connectionName: 'default',
            host: config.get('PG_HOST'),
            port: config.get('PG_PORT'),
            database: config.get('PG_DATABASE'),
            username: config.get('PG_USERNAME'),
            password: config.get('PG_PASSWORD'),
            maxAttempts: Number(config.get('PG_MAX_CONN_ATTEMPTS', 25)),
            attemptDelay: Number(config.get('PG_CONN_ATTEMPTS_DELAY', 5000)),
            models: [],
        }]

        settings.express = {
            graphql: {
                testIsEnabled: true,
                testToken: 'fooo',
            },

            ssr: {
                // multilanguage cache policy
                shouldCache: (req) => (req.query.locale === undefined),
                getCacheKey: (req) => ({ value: [ req.url, req.locale.language, req.locale.region ] }),
            },
        }

        settings.jwt = {
            secret: config.get('JWT_SECRET'),
            duration: config.get('JWT_DURATION'),
        }

        settings.hash = {
            rounds: Number(config.get('BCRYPT_ROUNDS')),
        }
    },
})

process.env.NODE_ENV === 'development' && registerAction({
    hook: FINISH,
    name: '♦ boot',
    handler: () => logBoot(),
})

export default createHookApp({
    settings: {},
    services,
    features,
})
