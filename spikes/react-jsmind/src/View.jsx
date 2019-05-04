import React, { useRef } from 'react'
import PropTypes from 'prop-types'

const useParentSize = (el) => {
    if (!el.current) {
        return [ 0, 0 ]
    }

    return [
        el.current.parentElement.clientWidth,
        el.current.parentElement.clientHeight,
    ]
}

const View = ({ width, height, children, style }) => {
    const el = useRef(null)
    const [ parentWidth, parentHeight ] = useParentSize(el)

    const size = {
        width: width || parentWidth,
        height: height || parentHeight,
    }

    console.log({ ...style, ...size })

    return (
        <div ref={el} style={{ ...style, ...size }}>
            {children(size)}
        </div>
    )
}

View.propTypes = {
    style: PropTypes.object,
    width: PropTypes.number,
    height: PropTypes.number,
    children: PropTypes.func.isRequired,
}

View.defaultProps = {
    style: {},
    width: null,
    height: null,
}

export default View