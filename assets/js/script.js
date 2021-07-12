var count = 0
var multiplicator = 1
var perSecond = 0
var perClick = 1
var bonusPrice = 2500
var isBonusActive = false
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

function changeCount(increment) {
    count += increment
    countElement.innerText = count > 1 ? count + " Carottes" : count + " Carotte"
}

function changeMultiplicator(value) {
    multiplicator += value
    buttonMultiplicatorElement.innerText = "Multiplicateur : " + calcMultiplicatorPrice() + " carotte"
    multiplicatorElement.innerText = "x" + multiplicator
}

function changePerSecond(value) {
    perSecond += value
    buttonAutoclickElement.innerText = "AutoClick : " + calcAutoClickPrice() + " carotte"
    perSecondElement.innerText = perSecond > 1 ? perSecond + " carottes par seconde" : perSecond + " carotte par seconde"
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
        sendmessage("Good vous avez acheter le multiplicateur")
    } else {
        sendmessage("Vous n'avez pas asser de carotte")
    }
})

buttonAutoclickElement.addEventListener("click", () => {
    let price = calcAutoClickPrice()

    if (count >= price) {
        changePerSecond(1)
        changeCount(-price)
        sendmessage("Good vous avez acheter le auto click")
    } else {
        sendmessage("Vous n'avez pas asser de carotte")
    }
})

buttonBonusElement.addEventListener("click", () => {
    if (count >= bonusPrice) {
        changeCount(-bonusPrice)
        sendmessage("Good vous avez acheter le bonus")

        isBonusActive = true
        bonusTimer = 30

        setInterval(() => {
            changeBonusTimer(-1)

            if (bonusTimer === 0) {
                isBonusActive = false
            }
        }, 1000)
    } else {
        sendmessage("Vous n'avez pas asser de carotte")
    }
})

setInterval(() => {
    changeCount(perSecond * multiplicator)
}, 1000)