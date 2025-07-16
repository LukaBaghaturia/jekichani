let $choose = document.getElementById('choose')
let $gameProcess = document.getElementById('gameprocess')
let $gameprocessMyChoice = document.getElementById('gameprocessMyChoice')
let $gameprocessBotChoice = document.getElementById('gameprocessBotChoice')
let $winCount = document.getElementById('winCount')
let $winOrLoss = document.getElementById('winOrLoss')
let $winorlossText = document.getElementById('winorlossText')
let $playAgain = document.getElementById('playAgain')
let $paper = document.getElementById('paper')
let $scissors = document.getElementById('scissors')
let $rock = document.getElementById('rock')

let choiceArr = ['paper', 'scissors', 'rock']

/**
 * @typedef {'rock' | 'paper' | 'scissors'} Choice
 */

/**
 * @enum
 * @constant
 */
const CHOICE = {
    ROCK: 'rock',
    PAPER: 'paper',
    SCISSORS: 'scissors'
}

/**
 * @enum
 * @constant
 */
const FIGHT_RESULT = {
    LOSE: 0,
    TIE: 1,
    WIN: 2
}

/**
 * this function returns the result of the fight between user and bot
 *
 * @param {Choice} userChoice
 * @param {Choice} botChoice
 * @returns {FIGHT_RESULT}
 */
function getFightResult(userChoice, botChoice) {
    if (userChoice === 'paper') {
        if (botChoice === 'paper') {
            return FIGHT_RESULT.TIE
        } else if (botChoice === 'rock') {
            return FIGHT_RESULT.WIN
        } else if (botChoice === 'scissors') {
            return FIGHT_RESULT.LOSE
        }
    } else if (userChoice === 'rock') {
        if (botChoice === 'paper') {
            return FIGHT_RESULT.LOSE
        } else if (botChoice === 'rock') {
            return FIGHT_RESULT.TIE
        } else if (botChoice === 'scissors') {
            return FIGHT_RESULT.WIN
        }
    } else if (userChoice === 'scissors') {
        if (botChoice === 'paper') {
            return FIGHT_RESULT.WIN
        } else if (botChoice === 'rock') {
            return FIGHT_RESULT.LOSE
        } else if (botChoice === 'scissors') {
            return FIGHT_RESULT.TIE
        }
    }
}

/**
 * Sets score
 *
 * @param {number} score
 * @returns {void}
 */
function setScore(score) {
    $winCount.textContent = score
}

/**
 * Returns random choice
 *
 * @returns {Choice}
 */
function getRandomChoice() {
    return choiceArr[Math.floor(Math.random() * choiceArr.length)]
}

let userChoice
let botChoice
let score = 0

/**
 *
 * @param {Choice} choice
 * @returns {string}
 */
function getChoiceImageSrc(choice) {
    return {
        paper: 'images/paper.png',
        rock: 'images/rock.png',
        scissors: 'images/scissors.png'
    }[choice]
}

function setUserChoiceHTML() {
    const imageSrc = getChoiceImageSrc(userChoice)

    $gameprocessMyChoice.innerHTML = `
    <span class="gameprocess__choice-text">YOU PICKED</span>
    <div class="circle gameprocess__choice-${userChoice} jekichani__moves" id="animation">
        <div class="circle-second"><img src="${imageSrc}" alt="" class="image-game"></div>
    </div>`
}

function setBotChoiceHTML() {
    const imageSrc = getChoiceImageSrc(botChoice)

    $gameprocessBotChoice.innerHTML = `
    <span class="gameprocess__choice-text">OPONENT <br>PICKED</span>
    <div class="circle gameprocess__choice-${botChoice} jekichani__moves" id="botChoice">
        <div class="circle-second"><img src="${imageSrc}" alt="" class="image-game"></div>
    </div>`
}

function onClick() {
    $choose.style.display = 'none'
    setUserChoiceHTML()
    setBotChoiceHTML()
    $gameProcess.style.display = 'flex'

    const fightResult = getFightResult(userChoice, botChoice)
    const resultText = {
        [FIGHT_RESULT.LOSE]: 'You Lost',
        [FIGHT_RESULT.TIE]: 'Tie',
        [FIGHT_RESULT.WIN]: 'You Win'
    }[fightResult]
    $winorlossText.innerText = resultText

    setTimeout(() => {
        $winOrLoss.style.display = 'flex'

        if (fightResult === FIGHT_RESULT.LOSE) {
            const $botChoice = document.getElementById('botChoice')
            $botChoice.classList.add(`winning__animation-${botChoice}`)
        } else if (fightResult === FIGHT_RESULT.WIN) {
            const animation = document.getElementById('animation')
            animation.classList.add(`winning__animation-${userChoice}`)
            score++
            setScore(score)
        }
    }, 3000)
}

setScore(score)

$paper.addEventListener('click', () => {
    userChoice = 'paper'
    botChoice = getRandomChoice()

    onClick()
})

$rock.addEventListener('click', () => {
    userChoice = 'rock'
    botChoice = getRandomChoice()

    onClick()
})

$scissors.addEventListener('click', () => {
    userChoice = 'scissors'
    botChoice = getRandomChoice()

    onClick()
})

$playAgain.addEventListener('click', () => {
    $gameProcess.style.display = 'none'
    $choose.style.display = 'flex'
})

// modal
let $rules = document.getElementById('rules')
let $modal = document.getElementById('modal')
let $modalExit = document.getElementById('modalExit')

$rules.addEventListener('click', () => {
    $modal.style.display = 'flex'
})

$modalExit.addEventListener('click', () => {
    $modal.style.display = 'none'
})
