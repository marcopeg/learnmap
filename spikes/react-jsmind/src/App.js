/* global localStorage */
import React, { useState, useEffect } from 'react'
import JsMind from './JsMind'
import View from './View'

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
            <View height={450}>
                {size => (
                    <JsMind {...size}
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
                )}
            </View>
            
            <hr />

            <View height={300}>
                {size => (
                    <JsMind {...size}
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
                )}
            </View>
        </div>
    )
}

export default App
