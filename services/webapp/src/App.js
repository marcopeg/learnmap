import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

const mapState = ({ app, locale }) => ({
    name: app.name,
    locale: locale.html,
})

const App = ({ name, locale }) => (
    <>
        <Helmet>
            <html lang={locale} />
            <title>{name}</title>
        </Helmet>
        <div className="App">
            {name} - {locale}
        </div>
    </>
)

App.propTypes = {
    name: PropTypes.string.isRequired,
    locale: PropTypes.string.isRequired,
}

export default connect(mapState)(App)
