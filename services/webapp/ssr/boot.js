import { registerAction, SETTINGS, FINISH } from '@marcopeg/hooks'
import { createHookApp, logBoot } from '@marcopeg/hooks'

// polyfill "fetch" in NodeJS
require('es6-promise').polyfill()
require('isomorphic-fetch')

const features = []

const services = [
    require('@forrestjs/service-env'),
    require('@forrestjs/service-logger'),
    require('@forrestjs/service-express'),
    require('@forrestjs/service-express-cookies'),
    require('@forrestjs/service-express-graphql'),
    require('@forrestjs/service-express-ssr'),
    require('@forrestjs/feature-locale'),
]

registerAction({
    hook: SETTINGS,
    name: '♦ boot',
    handler: async ({ settings }) => {
        settings.express = {
            ssr: {
                // multilanguage cache policy
                shouldCache: (req) => (req.query.locale === undefined),
                getCacheKey: (req) => ({ value: [ req.url, req.locale.language, req.locale.region ] }),
            },
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
