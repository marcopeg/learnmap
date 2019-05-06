/**
 * This reducer is meant to receive info from the initialState and
 * offers no way to change them.
 */

export const initialState = {
    scope: 'xxx',
}

/**
 * Actions
 */


/**
 * Handlers
 */

export const actionHandlers = {}

export const reducer = (state = initialState, action) => {
    const handler = actionHandlers[action.type]
    return handler ? handler(state, action) : state
}

export default reducer

