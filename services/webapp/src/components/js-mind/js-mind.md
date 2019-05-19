```js
<JsMind
    name="map1"
    width={'100%'} height={450}
    style={{ border: '1px solid black' }}
    data={[
        { id: `n1`, isroot: true, topic: `Web Development` },
            { id: `n2`, parentid: `n1`, topic: `HTML`},
                { id: `n2-1`, parentid: `n2`, topic: `Markup Language`},
                { id: `n2-2`, parentid: `n2`, topic: `HTML Tags`},
                { id: `n2-3`, parentid: `n2`, topic: `Linking Pages`},
            { id: `n3`, parentid: `n1`, topic: `NodeJS`},
                { id: `n3-1`, parentid: `n3`, topic: `Setup your machine`},
                { id: `n3-2`, parentid: `n3`, topic: `Run Node CLI Apps`},
            { id: `n4`, parentid: `n1`, topic: `React`},
    ]}
/>
```