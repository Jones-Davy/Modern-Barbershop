const API_URL = 'https://educated-kindly-paddleboat.glitch.me/';

const year = new Date().getFullYear()

const addPreload = elem => {
    elem.classList.add('preload')
}

const removePreload = elem => {
    elem.classList.remove('preload')
}

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

const addDisabled = (arr) => {
    arr.forEach(el => {
        el.disabled = true
    })
}

const removeDisabled = (arr) => {
    arr.forEach(el => {
        el.disabled = false
    })
}

const renderPrice = (wrapper, data) => {
    data.forEach(item => {
        const priceItem = document.createElement('li')
        priceItem.classList.add('price__item')

        priceItem.innerHTML = `
        <span class="price__item-title">${item.name}</span>
        <span class="price__item-count">${item.price} руб</span>
        `

        wrapper.append(priceItem)
    });
}

const renderService = (wrapper, data) => {
    const labels = data.map(item => {
        const label = document.createElement('label')
        label.classList.add('radio')
        label.innerHTML = `
        <input class="radio__input" type="radio" name="service" value="${item.id}">
        <span class="radio__label">${item.name}</span>
        `

        return label
    })

    wrapper.append(...labels)
}

const renderSpec = (wrapper, data) => {
    const labels = data.map(item => {
        const label = document.createElement('label')
        label.classList.add('radio')
        label.innerHTML = `
        <input class="radio__input" type="radio" name="spec" value="${item.id}">
        <span class="radio__label radio__label_spec" style="--bg-image:url(${API_URL}${item.img})">${item.name}</span>
        `

        return label
    })

    wrapper.append(...labels)
}

const renderMonth = (wrapper, data) => {
    const labels = data.map(month => {
        const label = document.createElement('label')
        label.classList.add('radio')
        label.innerHTML = `
        <input class="radio__input" type="radio" name="month" value="${month}">
        <span class="radio__label">${new Intl.DateTimeFormat('ru-RU', {
            month: 'long'
        }).format(new Date(year, month))}</span>
        `

        return label
    })

    wrapper.append(...labels)
}

const renderDay = (wrapper, data, month) => {
    const labels = data.map(day => {
        const label = document.createElement('label')
        label.classList.add('radio')
        label.innerHTML = `
        <input class="radio__input" type="radio" name="day" value="${day}">
        <span class="radio__label">${new Intl.DateTimeFormat('ru-RU', {
            month: 'long', day: 'numeric'
        }).format(new Date(year, month, day))}</span>
        `

        return label
    })

    wrapper.append(...labels)
}

const renderTime = (wrapper, data) => {
    const labels = data.map(time => {
        const label = document.createElement('label')
        label.classList.add('radio')
        label.innerHTML = `
        <input class="radio__input" type="radio" name="time" value="${time}">
        <span class="radio__label">${time}</span>
        `

        return label
    })

    wrapper.append(...labels)
}

const initService = () => {
    const priceList = document.querySelector('.price__list')
    const fieldService = document.querySelector('.reserve__fieldset_service')

    priceList.textContent = ''
    fieldService.innerHTML = '<legend class="reserve__legend">Услуга</legend>'

    addPreload(priceList)
    addPreload(fieldService)

    fetch(`${API_URL}/api`)
    .then(response => response.json())
    .then(data => {
        renderPrice(priceList, data)
        removePreload(priceList)
        return data
    })
    .then(data => {
        renderService(fieldService, data)
        removePreload(fieldService)
    })
 
}

const initReserve = () => {
    const reserveForm = document.querySelector('.reserve__form')
    const {fieldspec, fielddate, fieldmonth, fieldday, fieldtime, btn} = reserveForm

    addDisabled([fieldspec, fielddate, fieldmonth, fieldday, fieldtime, btn])

    reserveForm.addEventListener('change', async event => {
        const target = event.target

        if (target.name === 'service') {
            addDisabled([fieldspec, fielddate, fieldmonth, fieldday, fieldtime, btn])

            fieldspec.innerHTML = '<legend class="reserve__legend">Специалист</legend>'
            addPreload(fieldspec)

            const response = await fetch(`${API_URL}/api/?service=${target.value}`)
            const data = await response.json()

            renderSpec(fieldspec, data)
            removePreload(fieldspec)
            removeDisabled([fieldspec])
        }

        if (target.name === 'spec') {
            addDisabled([fielddate, fieldmonth, fieldday, fieldtime, btn])

            addPreload(fieldmonth)

            const response = await fetch(`${API_URL}/api/?spec=${target.value}`)
            const data = await response.json()
            
            fieldmonth.textContent = ''
            renderMonth(fieldmonth, data)
            removePreload(fieldmonth)
            removeDisabled([fielddate, fieldmonth])
        }

        if (target.name === 'month') {
            addDisabled([fieldday, fieldtime, btn])

            addPreload(fieldday)

            const response = await fetch(
                `${API_URL}/api/?spec=${reserveForm.spec.value}&month=${target.value}
                `)
            const data = await response.json()
            
            fieldday.textContent = ''
            renderDay(fieldday, data, reserveForm.month.value)
            removePreload(fieldday)
            removeDisabled([fieldday])
        }

        if (target.name === 'day') {
            addDisabled([fieldtime, btn])

            addPreload(fieldtime)

            const response = await fetch(
                `${API_URL}/api/?spec=${reserveForm.spec.value}&month=${reserveForm.month.value}&day=${target.value}
                `)
            const data = await response.json()
            
            fieldtime.textContent = ''
            renderTime(fieldtime, data)
            removePreload(fieldtime)
            removeDisabled([fieldtime])
        }

        if (target.name === 'time') {
            removeDisabled([btn])
        }
    })
}

const init = () => {
    initSlider()
    initService()
    initReserve()
}

init()

window.addEventListener('DOMContentLoaded', initSlider)
