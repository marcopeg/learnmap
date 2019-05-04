/* global localStorage */
import React, { useState, useEffect } from 'react'
import JsMind from './JsMind'

const App = () => {
    const [ data, setData ] = useState([])

    useEffect(() => {
        try {
            const data = JSON.parse(localStorage.getItem('jsmap'))
            data && setData(data)
        } catch (err) {}
    }, [ true ]) // eslint-disable-line

    return (
        <div className="App">
            <JsMind
                width={600}
                height={250}
                name="map1"
                theme="primary"
                data={data}
                editable={true}
                onChange={(data) => {
                    console.log('onChange - map1', data)
                    localStorage.setItem('jsmap', JSON.stringify(data))
                    setData(data)
                }}
            />
            <hr />
            <JsMind
                width={600}
                height={250}
                name="map2"
                theme="primary"
                data={data}
                editable={true}
                onChange={(data) => {
                    console.log('onChange - map2', data)
                    localStorage.setItem('jsmap', JSON.stringify(data))
                    setData(data)
                }}
            />
        </div>
    )
}

export default App
