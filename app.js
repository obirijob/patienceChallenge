

let gamebox = document.querySelector('.game-box')
let player1Choices = [], player2Choices = []

function drawGame() {
    resetChoices()
    let gameHTML = ''

    for (let r = 0; r < 3; r++) {
        let rowHTML = ''
        for (let c = 0; c < 3; c++) {
            rowHTML += `<div class="game-cell" id="${r}-${c}"></div>`
        }
        gameHTML += `<div class="game-row">${rowHTML}</div>`
    }

    gamebox.innerHTML = gameHTML

    let gameCells = document.querySelectorAll('.game-cell')

    for (let gameCell of gameCells) {
        gameCell.addEventListener('click', clickBox)
    }
}

function resetChoices() {
    player1Choices = []
    player2Choices = []
}

drawGame()

let players = [{ id: 1, name: 'patience' }, { id: 2, name: 'anne' }]
let activePlayer = 1

function clickBox(e) {
    let clickedBox = e.target

    clickedBox.classList.add('clicked')
    clickedBox.classList.add(activePlayer === 1 ? 'one' : 'two')

    if (activePlayer === 1) {
        activePlayer = 2
        player1Choices.push(clickedBox.id.toString())

    } else {
        activePlayer = 1
        player2Choices.push(clickedBox.id.toString())
    }

    checkWin(1, player1Choices)
    checkWin(2, player2Choices)
}

let combinations = [
    ['0-0', '0-1', '0-2'],
    ['1-0', '1-1', '1-2'],
    ['2-0', '2-1', '2-2'],
    ['0-0', '1-0', '2-0'],
    ['1-0', '1-1', '2-1'],
    ['2-0', '2-1', '2-2'],
    ['0-0', '1-1', '0-2'],
    ['0-2', '1-1', '2-0'],
]

function checkWin(activePlayer, choices) {
    let truthTable = combinations.map(c => c.every(choice => choices.find(ch => ch === choice)))
    if (truthTable.includes(true)) {
        alert(players[activePlayer - 1].name + ' wins!')
        drawGame()
    }
}




