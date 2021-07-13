var count = 0
var multiplicator = 1
var perSecond = 0
var perClick = 1
var bonusPrice = 2500
var isBonusActive = false
var bonusTimer = 0
var multiplicatorLvl = 1
var autoclickLvl = 1
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

function changeCount(increment) {
    count += increment
    countElement.innerText = count
}

function changeMultiplicator(value) {
    multiplicatorLvl++
    multiplicator += value
    buttonMultiplicatorElement.innerText = "Multiplicateur : " + calcMultiplicatorPrice() + " crotte"
    multiplicatorElement.innerText = "x" + multiplicator
    multiplicatorLvlElement.innerText = multiplicatorLvl
}

function changePerSecond(value) {
    autoclickLvl++
    perSecond += value
    buttonAutoclickElement.innerText = "AutoClick : " + calcAutoClickPrice() + " crotte"
    perSecondElement.innerText = perSecond
    autoclickLvlElement.innerText = autoclickLvl
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
}

buttonLapinElement.addEventListener("click", () => {
    changeCount(isBonusActive ? perClick * multiplicator * 2 : perClick * multiplicator)
})

buttonMultiplicatorElement.addEventListener("click", () => {
    let price = calcMultiplicatorPrice()

    if (count >= price) {
        changeMultiplicator(1)
        changeCount(-price)
        sendmessage("Good vous avez acheté le multiplicateur")
    } else {
        sendmessage("Vous n'avez pas assez de crotte")
    }
})

buttonAutoclickElement.addEventListener("click", () => {
    let price = calcAutoClickPrice()

    if (count >= price) {
        changePerSecond(1)
        changeCount(-price)
        sendmessage("Good vous avez acheté le auto click")
    } else {
        sendmessage("Vous n'avez pas assez de crotte")
    }
})

buttonBonusElement.addEventListener("click", () => {
    if (count >= bonusPrice) {
        changeCount(-bonusPrice)
        sendmessage("Good vous avez acheté le bonus")

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
    }
})

setInterval(() => {
    changeCount(perSecond * multiplicator)
}, 1000)