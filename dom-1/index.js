function getPath(element) {
    const elements = []
    if(element instanceof HTMLElement)
        elements.push(element)

    let parent = element.parentElement
    while (parent) {
        elements.unshift(parent)
        parent = parent.parentElement
    }

    return elements.map((elem) => {
        let index = Array.prototype.indexOf.call(elem.parentNode.children, elem) + 1
        return `${elem.tagName}:nth-child(${index})`
    }).join(' > ')
}