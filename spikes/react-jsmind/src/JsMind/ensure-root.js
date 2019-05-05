/* global jsMind */

export const ensureRoot = (originalData) => {
    const data = [...originalData]
    let rootNode = data.find($ => $.isroot)
    
    if (!rootNode) {
        rootNode = {
            id: `jsmind-node-${jsMind.util.uuid.newid()}`,
            isroot: true,
            topic: 'New Project',
        }
        data.push(rootNode)
    }

    if (data.length < 2) {
        data.push({
            id: `jsmind-node-${jsMind.util.uuid.newid()}`,
            topic: 'New Node',
            parentid: rootNode.id,
            direction: 'right',
        })
    }

    return data
}
