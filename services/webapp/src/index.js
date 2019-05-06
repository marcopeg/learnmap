import React from 'react'
import ReactDOM from 'react-dom'
import { createState } from './app/state'
import './app/locale'

const createHistory = require("history").createBrowserHistory

const boot = props => {
    const renderApp = () => {
        const Root = require('./Root').default
        ReactDOM.render(<Root {...props} />, document.querySelector('#root'))
    }

    if (module.hot) {
        module.hot.accept(renderApp)
    }

    renderApp()
}

const history = createHistory()
const initialState = window.__REDUX_INITIAL_STATE__ || {
    app: { title: 'LearnMap' },
    storage: { scope: 'lrnmp' },
}

createState(initialState, history)
    .then(boot)
    .catch(err => console.log(err))
