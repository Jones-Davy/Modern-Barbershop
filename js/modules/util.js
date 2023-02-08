export const addPreload = elem => {
    elem.classList.add('preload')
}

export const removePreload = elem => {
    elem.classList.remove('preload')
}

export const addDisabled = (arr) => {
    arr.forEach(el => {
        el.disabled = true
    })
}

export const removeDisabled = (arr) => {
    arr.forEach(el => {
        el.disabled = false
    })
}