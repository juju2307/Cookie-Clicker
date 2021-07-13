var count = localStorage.getItem("clicker_count") ? new Number(localStorage.getItem("clicker_count")) : 0
var multiplicator = localStorage.getItem("clicker_multiplicator") ? new Number(localStorage.getItem("clicker_multiplicator")) : 1
var perSecond = localStorage.getItem("clicker_perseconde") ? new Number(localStorage.getItem("clicker_perseconde")) : 0
var perClick = localStorage.getItem("clicker_perclick") ? new Number(localStorage.getItem("clicker_perclick")) : 1
var bonusPrice = 2500
var isBonusActive = false
var multiplicatorLvl = localStorage.getItem("clicker_multiplicatorlvl") ? new Number(localStorage.getItem("clicker_multiplicatorlvl")) : 1
var autoclickLvl = localStorage.getItem("clicker_autoclicklvl") ? new Number(localStorage.getItem("clicker_autoclicklvl")) : 1
var bonusTimer = 0
var countElement = document.getElementById("count")
var messageElement = document.getElementById("message")
var multiplicatorElement = document.getElementById("multiplicator")
var perSecondElement = document.getElementById("perSecond")
var bonusTimerElement = document.getElementById("bonusTimer")
var buttonLapinElement = document.getElementById("lapin")
var buttonMultiplicatorElement = document.getElementById("multiplicatorButton")
var buttonAutoclickElement = document.getElementById("autoclickButton")
var buttonBonusElement = document.getElementById("bonusButton")
var multiplicatorLvlElement = document.getElementById("multiplicatorlvl")
var autoclickLvlElement = document.getElementById("autoclicklvl")
var crotteimgElement = document.getElementById("crotteimg")
var buttonSoundElement = document.getElementById("buttonSound")
var sound = false
var myAudio = document.getElementById("audio1");
myAudio.volume = 0.15;


function sonTrue() {
    if (sound) {
        var sonVrai = new Audio('assets/sound/enoughMoney.mp3')
        sonVrai.volume = 0.05
        return sonVrai.play()
    }
}

function eat() {
    if (sound) {
        var omNom = new Audio('assets/sound/eat.mp3')
        omNom.volume = 0.05
        return omNom.play()
    }
}

function sonFalse() {
    if (sound) {
        var sonFaux = new Audio('assets/sound/notEnough.mp3')
        sonFaux.volume = 0.05
        return sonFaux.play()
    }
}

document.getElementById("sound").addEventListener("click", () => {
    toggleSound()
})

function initElement() {
    countElement.innerText = count

    buttonMultiplicatorElement.innerText = "Améliorer pour " + calcMultiplicatorPrice() + " crottes"
    multiplicatorElement.innerText = "x" + multiplicator
    multiplicatorLvlElement.innerText = multiplicatorLvl

    buttonAutoclickElement.innerText = "Améliorer pour " + calcAutoClickPrice() + " crottes"
    perSecondElement.innerText = perSecond * multiplicator
    autoclickLvlElement.innerText = autoclickLvl
}

function reset() {
    multiplicatorLvl = 1
    multiplicator = 1
    autoclickLvl = 1
    perSecond = 0
    count = 0

    localStorage.setItem("clicker_multiplicatorlvl", multiplicatorLvl)
    localStorage.setItem("clicker_multiplicator", multiplicator)
    localStorage.setItem("clicker_autoclicklvl", autoclickLvl)
    localStorage.setItem("clicker_perseconde", perSecond)

    initElement()
}

function toggleSound() {
    sound = !sound
    buttonSoundElement.src = sound ? 'assets/img/volume.png' : 'assets/img/mute.png'

    if (!sound)
        myAudio.pause()
    else
        myAudio.play()
}

function changeCount(increment) {
    count += increment
    countElement.innerText = count
    localStorage.setItem("clicker_count", count)

    if (count <= 50) {
        crotteimgElement.src = "assets/img/stade-1.png"
    } else if (count <= 150) {
        crotteimgElement.src = "assets/img/stade-2.png"
    } else if (count <= 500) {
        crotteimgElement.src = "assets/img/stade-3.png"
    } else if (count <= 3000) {
        crotteimgElement.src = "assets/img/stade-4.png"
    } else {
        crotteimgElement.src = "assets/img/stade-5.png"
    }
}

function changeMultiplicator(value) {
    multiplicatorLvl++
    multiplicator += value
    buttonMultiplicatorElement.innerText = "Améliorer pour " + calcMultiplicatorPrice() + " crottes"
    multiplicatorElement.innerText = "x" + multiplicator
    multiplicatorLvlElement.innerText = multiplicatorLvl
    perSecondElement.innerText = perSecond * multiplicator

    localStorage.setItem("clicker_multiplicatorlvl", multiplicatorLvl)
    localStorage.setItem("clicker_multiplicator", multiplicator)
}

function changePerSecond(value) {
    autoclickLvl++
    perSecond += value
    buttonAutoclickElement.innerText = "Améliorer pour " + calcAutoClickPrice() + " crottes"
    perSecondElement.innerText = perSecond * multiplicator
    autoclickLvlElement.innerText = autoclickLvl

    localStorage.setItem("clicker_autoclicklvl", autoclickLvl)
    localStorage.setItem("clicker_perseconde", perSecond)
}

function changeBonusTimer(increment) {
    bonusTimer += increment
    bonusTimerElement.innerText = bonusTimer
}

function calcMultiplicatorPrice () {
    return multiplicator * 50
}

function calcAutoClickPrice () {
    return (perSecond + 1) * 250
}

function sendmessage(message) {
    messageElement.innerText = message

    setTimeout(() => {
        if (messageElement.innerText === message)
            messageElement.innerText = ""
    }, 3000)
}

buttonLapinElement.addEventListener("click", () => {
    changeCount(isBonusActive ? perClick * multiplicator * 2 : perClick * multiplicator)
    eat()
})

buttonMultiplicatorElement.addEventListener("click", () => {
    let price = calcMultiplicatorPrice()

    if (count >= price) {
        changeMultiplicator(1)
        changeCount(-price)
        sendmessage("Good vous avez acheté le multiplicateur")
        sonTrue()

    } else {
        sendmessage("Vous n'avez pas assez de crotte")
        sonFalse()
    }
})

buttonAutoclickElement.addEventListener("click", () => {
    let price = calcAutoClickPrice()

    if (count >= price) {
        changePerSecond(1)
        changeCount(-price)
        sendmessage("Good vous avez acheté le auto click")
        sonTrue()
    } else {
        sendmessage("Vous n'avez pas assez de crotte")
        sonFalse()
    }
})

buttonBonusElement.addEventListener("click", () => {
    if (isBonusActive) {
        sendmessage("Un bonus est déjà actif")
        return
    }

    if (count >= bonusPrice) {
        changeCount(-bonusPrice)
        sendmessage("Good vous avez acheté le bonus")
        sonTrue()

        isBonusActive = true
        bonusTimer = 30

        let interval = setInterval(() => {
            changeBonusTimer(-1)

            if (bonusTimer === 0) {
                isBonusActive = false
                window.clearInterval(interval)
            }
        }, 1000)
    } else {
        sendmessage("Vous n'avez pas assez de crotte")
        sonFalse()
    }
})

setInterval(() => {
    changeCount(perSecond * multiplicator)
}, 1000)

initElement()