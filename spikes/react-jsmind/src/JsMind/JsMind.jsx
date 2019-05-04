import React from 'react'
import PropTypes from 'prop-types'
import deepEqual from 'deep-equal'
import jsMind from './jsmind'
import { ensureRoot } from './ensure-root'

class JsMind extends React.Component {
    constructor (props) {
        super(props)

        this.id = `jsmind-${jsMind.util.uuid.newid()}`
        this.el = React.createRef()
    }

    componentDidMount () {
        this.map = jsMind.show({
            container: this.id,
            editable: this.props.editable,
            theme: this.props.theme,
            shortcut: {
                enable: true,
                mapping: {
                    addchild: 65,    // a (append)
                    addbrother: 83,  // s (sibling)
                    editnode: 13,    // enter
                    delnode: 8,      // backspace
                }
            }
        }, {
            meta: this.props.meta,
            format: this.props.format,
            data: ensureRoot(this.props.data),
        })

        this.startObserveChanges()
    }

    componentWillUnmount () {
        clearInterval(this._observeChangesTimer)
    }

    shouldComponentUpdate () {
        console.log('new props')
        return false
    }

    startObserveChanges () {
        const { format, onChangeInterval, onChange } = this.props
        if (!onChange) {
            return
        }

        clearInterval(this._observeChangesTimer)
        let oldVal = this.map.get_data(format)
        this._observeChangesTimer = setInterval(() => {
            const newVal = this.map.get_data(format)
            deepEqual(oldVal, newVal) === false && onChange(newVal, oldVal)
            oldVal = newVal
        }, onChangeInterval)
    }

    render () {
        const style = {
            width: this.props.width,
            height: this.props.height,
            textAlign: 'left',
            border: '1px solid black',
        }

        return (
            <div
                id={this.id}
                ref={this.el}
                style={style}
            />
        )
    }
}

JsMind.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    onChange: PropTypes.func,
    onChangeInterval: PropTypes.number,
}

JsMind.defaultProps = {
    onChange: null,
    onChangeInterval: 100,
}

export default JsMind
