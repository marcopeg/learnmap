import path from 'path'
import fs from 'fs'

import {
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql'

import GraphQLJSON from 'graphql-type-json'
import { EXPRESS_GRAPHQL } from 'ssr/services/express/hooks'

const loadLocaleFile = (locale) => new Promise((resolve, reject) => {
    const origin = (process.env.NODE_ENV === 'development' && locale !== 'en')
        ? 'public'
        : 'build'
    const filePath = path.join(process.cwd(), origin, 'locale', `${locale.toLowerCase()}.json`)
    fs.readFile(filePath, 'utf8', (err, data) => err ? reject(err) : resolve(data))
})

const loadMessages = async (locale) => {
    let data = null

    try {
        data = await loadLocaleFile(locale)
    } catch (err) {
        throw new Error(`localization "${locale}" not available`)
    }

    try {
        return JSON.parse(data)
    } catch (err) {
        throw new Error(`localization "${locale}" is corrupted`)
    }
}

const localeQuery = {
    description: 'Provides localized messages',
    args: {
        locale: {
            type: new GraphQLNonNull(GraphQLString),
        },
    },
    type: new GraphQLNonNull(new GraphQLObjectType({
        name: 'Locale',
        fields: {
            locale: {
                type: new GraphQLNonNull(GraphQLString),
            },
            messages: {
                type: GraphQLJSON,
            },
        },
    })),
    resolve: async (params, args) => ({
        locale: args.locale,
        messages: await loadMessages(args.locale),
    }),
}

export const register = ({ registerAction }) =>
    registerAction({
        hook: EXPRESS_GRAPHQL,
        name: '▶ locale',
        handler: ({ queries }) => {
            queries.locale = localeQuery
        },
    })

