import React from 'react'
import { injectIntl, intlShape, defineMessages } from 'react-intl'

const messages = defineMessages({
    title: {
        id: 'pages.HomePage.title',
        defaultMessage: 'Falcon Monitor',
    },
    text: {
        id: 'pages.HomePage.text',
        defaultMessage: 'keep an eye on stuff',
    },
})

const HomePage = ({ intl }) => (
    <div>
        <div>
            <div>
                {intl.formatMessage(messages.title)}
            </div>
            <div>
                {intl.formatMessage(messages.text)}
            </div>
        </div>
    </div>
)

HomePage.propTypes = {
    intl: intlShape.isRequired,
}

export default injectIntl(HomePage)
