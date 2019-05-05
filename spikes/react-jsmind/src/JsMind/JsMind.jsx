/* global jsMind */

import React from 'react'
import PropTypes from 'prop-types'
import deepEqual from 'deep-equal'
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

        this.setMapZoom(this.props.zoom)

        this.startObserveChanges()

        // @TODO: move to method
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

    // shouldComponentUpdate (nextProps) {
    //     // const { format } = this.props
    //     // const currentMap = this.map.get_data(format)
        
    //     // if (!deepEqual(currentMap.data, nextProps.data)) {
    //     //     this.replaceMapData({
    //     //         ...currentMap,
    //     //         data: nextProps.data,
    //     //     })
    //     // }

    //     return true
    // }

    componentDidUpdate (prevProps) {
        const { format } = this.props
        const currentMap = this.map.get_data(format)
        
        // update data
        if (!deepEqual(currentMap.data, this.props.data)) {
            this.replaceMapData({
                ...currentMap,
                data: this.props.data,
            })
        }

        // update zoom
        if (this.props.zoom !== prevProps.zoom) {
            this.setMapZoom(this.props.zoom)
        }
    }

    replaceMapData (data) {
        this.stopObserveChanges()
        
        try {
            this.map.show(data)
        } catch (err) {} // eslint-disable-line

        try {
            const innerEl = this.el.current.querySelector('div')
            innerEl.scrollTop = this.state.scrollTop
            innerEl.scrollLeft = this.state.scrollLeft
        } catch (err) {} // eslint-disable-line

        this.startObserveChanges()
    }

    setMapZoom (zoom) {
        console.log(zoom)
        this.map.view.setZoom(zoom)
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
    zoom: PropTypes.number,
    onChange: PropTypes.func,
    onChangeInterval: PropTypes.number,
}

JsMind.defaultProps = {
    width: 0,
    height: 0,
    zoom: 1,
    meta: {},
    format: 'node_array',
    onChange: null,
    onChangeInterval: 100,
}

export default JsMind
