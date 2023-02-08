import { addPreload, removePreload } from "./util.js"

const startSlider = () => {
    const sliderItems = document.querySelectorAll('.slider__item')
    const sliderList = document.querySelector('.slider__list')
    const btnPrevSlide = document.querySelector('.slider__arrow_left')
    const btnNextSlide = document.querySelector('.slider__arrow_right')

    let activeSlide = 1
    let position = 0

    const checkSlider = () => {
        activeSlide + 2 === sliderItems.length 
        && document.documentElement.offsetWidth > 560
        || activeSlide === sliderItems.length

        ? btnNextSlide.style.display = 'none'
        : btnNextSlide.style.display = ''

        activeSlide === 1
        ? btnPrevSlide.style.display = 'none'
        : btnPrevSlide.style.display = ''

        }

    checkSlider()

    const nextSlide = () => {
        sliderItems[activeSlide]?.classList.remove('slider__item_active')

        position = sliderItems[0].clientWidth * activeSlide
        sliderList.style.transform = `translateX(-${position}px)`
        activeSlide += 1

        sliderItems[activeSlide]?.classList.add('slider__item_active')

        checkSlider()
    }

    const prevSlide = () => {
        sliderItems[activeSlide]?.classList.remove('slider__item_active')

        position = -sliderItems[0].clientWidth * (activeSlide - 2)
        sliderList.style.transform = `translateX(${position}px)`
        activeSlide -= 1

        sliderItems[activeSlide]?.classList.add('slider__item_active')

        checkSlider()
    }

    btnPrevSlide.addEventListener('click', prevSlide)
    btnNextSlide.addEventListener('click', nextSlide)

    window.addEventListener('resize', () => {
        if(activeSlide + 2 > sliderItems.length &&
        document.documentElement.offsetWidth > 560) {
        activeSlide = sliderItems.length - 2
        sliderItems[activeSlide]?.classList.add('slider__item_active')
        }

        position = -sliderItems[0].clientWidth * (activeSlide - 1)
        sliderList.style.transform = `translateX(${position}px)`
        checkSlider()
    })

}

export const initSlider = () => {
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