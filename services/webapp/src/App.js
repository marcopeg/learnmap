import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import JsMind from 'components/js-mind'

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
            <hr />
            <JsMind
                name={'Map1'}
                width={600}
                height={600}
                onChange={(data) => {
                    console.log(data)
                }}
            />
        </div>
    </>
)

App.propTypes = {
    name: PropTypes.string.isRequired,
    locale: PropTypes.string.isRequired,
}

export default connect(mapState)(App)
