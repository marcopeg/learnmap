/* eslint no-multi-spaces:off */
/* global jsMind */

import React from 'react'
import PropTypes from 'prop-types'
import deepEqual from 'deep-equal'
import { ensureRoot } from './ensure-root'

class JsMind extends React.Component {
    constructor (props) {
        super(props)

        this.id = `jsmind-${jsMind.util.uuid.newid()}`
        this.el = React.createRef()

        this.currentScroll = {
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
                },
            },
        }, {
            format: this.props.format,
            meta: this.props.meta,
            data: ensureRoot(this.props.data),
        })

        this.setMapZoom(this.props.zoom)

        this.startObserveChanges()
        this.startObserveScroll()
    }

    componentDidUpdate (prevProps) {
        const { format } = this.props
        const currentMap = this.map.get_data(format)

        // update data
        if (!deepEqual(currentMap.data, this.props.data)) {
            this.replaceMapData({
                ...currentMap,
                data: ensureRoot(this.props.data),
            })
        }

        // update zoom
        if (this.props.zoom !== prevProps.zoom) {
            this.setMapZoom(this.props.zoom)
        }
    }

    componentWillUnmount () {
        this.stopObserveChanges()
        this.stopObserveScroll()
    }

    replaceMapData (data) {
        this.stopObserveChanges()

        try {
            this.map.show(data)
        } catch (err) {} // eslint-disable-line

        try {
            const innerEl = this.el.current.querySelector('div')
            innerEl.scrollTop = this.currentScroll.scrollTop
            innerEl.scrollLeft = this.currentScroll.scrollLeft
        } catch (err) {} // eslint-disable-line

        this.startObserveChanges()
    }

    setMapZoom (zoom) {
        this.map.view.setZoom(zoom)
    }


    /**
     * Observe Data Changes
     */

    startObserveChanges () {
        const { format, observeChangeInterval, onChange } = this.props
        if (!onChange) {
            return
        }

        clearInterval(this._observeChangesTimer)
        let oldVal = this.map.get_data(format)
        this._observeChangesTimer = setInterval(() => {
            const newVal = this.map.get_data(format)
            deepEqual(oldVal, newVal) === false && onChange(newVal.data, oldVal.data)
            oldVal = newVal
        }, observeChangeInterval)
    }

    stopObserveChanges () {
        clearInterval(this._observeChangesTimer)
    }


    /**
     * Observe Scroll Changes
     */

    startObserveScroll () {
        const { observeScrollInterval } = this.props

        clearInterval(this._observeScrollTimer)
        this._observeChangesTimer = setInterval(() => {
            try {
                const innerEl = this.el.current.querySelector('div')
                this.currentScroll.scrollTop = innerEl.scrollTop
                this.currentScroll.scrollLeft = innerEl.scrollLeft
            } catch (err) {} // eslint-disable-line
        }, observeScrollInterval)
    }

    stopObserveScroll () {
        clearInterval(this._observeScrollTimer)
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
    observeChangeInterval: PropTypes.number,
    observeScrollInterval: PropTypes.number,
    data: PropTypes.array,
    editable: PropTypes.bool,
    theme: PropTypes.string,
    format: PropTypes.string,
    meta: PropTypes.object,
    name: PropTypes.string.isRequired,
}

JsMind.defaultProps = {
    width: 0,
    height: 0,
    zoom: 1,
    meta: {},
    format: 'node_array',
    onChange: null,
    observeChangeInterval: 100,
    observeScrollInterval: 100,
    data: [],
    editable: true,
    theme: 'primary',
}

export default JsMind
