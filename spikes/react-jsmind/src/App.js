/* global localStorage */
import React from 'react'
import JsMind from './JsMind'

const mind = {
    "meta":{
        "name":"demo",
        "author":"hizzgdev@163.com",
        "version":"0.2",
    },
    "format":"node_array",
    "data": [],
}

const App = () => {
    let data = []
    try {
        data = JSON.parse(localStorage.getItem('jsmap'))
    } catch (err) {
        data = []
    }

    return (
        <div className="App">
            <JsMind
                width={600}
                height={250}
                meta={mind.meta}
                format={mind.format}
                data={data}
                editable={true}
                theme="primary"
                onChange={(val, old) => {
                    localStorage.setItem('jsmap', JSON.stringify(val.data))
                }}
            />
            <hr />
            <JsMind
                width={600}
                height={250}
                meta={mind.meta}
                format={mind.format}
                data={data}
                editable={true}
                theme="primary"
                onChange={(val, old) => {
                    localStorage.setItem('jsmap', JSON.stringify(val.data))
                }}
            />
        </div>
    )
}

export default App
