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

        this.state = {
            scrollTop: 0,
            scrollLeft: 0,
        }
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
            format: this.props.format,
            meta: this.props.meta,
            data: ensureRoot(this.props.data),
        })

        this.startObserveChanges()

        setInterval(() => {
            try {
                const innerEl = this.el.current.querySelector('div')
                this.setState({
                    scrollTop: innerEl.scrollTop,
                    scrollLeft: innerEl.scrollLeft,
                })
            } catch (err) {}
        }, 1000)
    }

    componentWillUnmount () {
        this.stopObserveChanges()
    }

    shouldComponentUpdate (nextProps) {
        const { format } = this.props
        const currentMap = this.map.get_data(format)
        
        if (!deepEqual(currentMap.data, nextProps.data)) {
            this.replaceMapData({
                ...currentMap,
                data: nextProps.data,
            })
        }

        return true
    }

    replaceMapData (data) {
        this.stopObserveChanges()
        this.map.show(data)
        try {
            const innerEl = this.el.current.querySelector('div')
            innerEl.scrollTop = this.state.scrollTop
            innerEl.scrollLeft = this.state.scrollLeft
        } catch (err) {}
        this.startObserveChanges()
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
            deepEqual(oldVal, newVal) === false && onChange(newVal.data, oldVal.data)
            oldVal = newVal
        }, onChangeInterval)
    }

    stopObserveChanges () {
        clearInterval(this._observeChangesTimer)
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
    width: PropTypes.number,
    height: PropTypes.number,
    onChange: PropTypes.func,
    onChangeInterval: PropTypes.number,
}

JsMind.defaultProps = {
    width: 0,
    height: 0,
    meta: {},
    format: 'node_array',
    onChange: null,
    onChangeInterval: 100,
}

export default JsMind
