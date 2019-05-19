import createSSRState from '@forrestjs/core/lib/create-ssr-state'

const features = [
    require('@forrestjs/feature-storage/client'),
    require('@forrestjs/feature-network/client'),
    require('@forrestjs/feature-locale/client'),
]

const app = () => ({
    id: process.env.REACT_APP_ID || 'learnmap',
    name: process.env.REACT_APP_NAME || 'LearnMap',
})

export const createState = createSSRState({ app }, features)
