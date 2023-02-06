const addPreload = elem => {
    elem.classList.add('preload')
}

const removePreload = elem => {
    elem.classList.remove('preload')
}

const startSlider = (slider) => {
    
}

const initSlider = () => {
    const slider = document.querySelector('.slider')
    const sliderContainer = document.querySelector('.slider__container')

    sliderContainer.style.display = 'none'
    addPreload(slider)

    window.addEventListener('load', () => {
        sliderContainer.style.display = ''

        removePreload(slider)
        startSlider(slider)
    
    })
}

window.addEventListener('DOMContentLoaded', initSlider)
