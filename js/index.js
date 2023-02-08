import { initSlider } from "./modules/slider.js"
import { initReserve } from "./modules/initReserve.js"
import { initService } from "./modules/initService.js"

const init = () => {
    initSlider()
    initService()
    initReserve()
}

init()

window.addEventListener('DOMContentLoaded', initSlider)
