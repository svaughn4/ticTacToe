// Create the game board object 
let gameboard = (() => { 
    let board = ['-', '-', '-', '-', '-', '-', '-', '-', '-'] 
    return {board}
})();

// Keep track of the players
let players = []

// Define the cells of the grid
let grid = document.getElementsByClassName('cells')
grid = Array.from(grid)

// Add click event listener to form submit button
const submit = document.getElementById('submit')
const name1 = document.getElementById('player1')
const name2= document.getElementById('player2') 

// Add click events to each of the grid cells
const activateCells = (() => {
    const start = () => {
        console.log('start runs')
        grid.forEach( (element) => {
            element.addEventListener('click', () => { 
                if(controller.status == false && players.length == 1) {
                    makeMove(element)
                } else if(controller.status == true){
                     e.stopPropagation()
                }
            })
        })
    }
    return {start}
})()
activateCells.start()

function submitInfo () {
    const player1 = playerFactory(name1.value)
    players.push(player1)
    const player2 = playerFactory(name2.value)
    players.push(player2) 
    // Controller stores the first player object from the array
    // Only store 1 player in the object at a time
    controller.turn = players.shift()
    controls.updateMessage()
    //submit.removeEventListener('click', submitInfo)
}

// Submit button sends object to player factory function
submit.addEventListener('click', submitInfo)

// Message field on the page
let message = document.getElementById('message')

// Create a player object with their name and board mark
const playerFactory = (string) => {
    if(players.length == 0) { 
        const style = 'X'
        const who = string
        return {who, style}
    } else {
        const style = 'O'
        const who = string
        return {who, style}
    }
}

// Create game controller
const controller = (() => {
    // Turn property keeps track of who makes the current move
    let turn = {}
    // Status property remains false until someone wins or a tie
    let status = false
    // Method property as to the kind of result; tie or win 
    let method = ''
    return{turn, status, method}
})();

// BUG: Each time I click on a div, runs controls.start twice
const controls = (function() {
    // Add click event listener to each grid cell
    const start = () => {
        console.log('start runs')
        grid.forEach( (element) => {
            element.addEventListener('click', () => { 
                if(controller.status == false && players.length == 1) {
                    makeMove(element)
                } else if(controller.status == true){
                     e.stopPropagation()
                }
            })
        })
    }

    const updateMessage = () => { 
        console.log('message is updated')
        message.textContent = `${controller.turn.who}` + ', select a square'
    }
    // Checks if the corresponding grid cell is clear in the gameboard array
    const checkMove = (pos) => { 
        for(let i = 0; i < gameboard.board.length; i++) {
            if (i == pos - 1 && gameboard.board[i] != '-') {
                return false
            }
        } return true
    } 
    const restart = () => { 
        gameboard.board = ['-', '-', '-', '-', '-', '-', '-', '-', '-']
        grid.forEach( (element) => {
            element.textContent = ""
        })
        // Clear the player array
        players = []
        // Clear the player info form 
        let form = document.getElementById('form').reset()
        message.textContent = ""
        controller.turn = {}
        controller.status = false
        console.log(controller.turn)
        controller.method = ""
        submit.addEventListener('click', submitInfo)
    }
    return {start, updateMessage, checkMove, restart}
})() 


// Updates controller status to true if a player has won otherwise remains false
const hasWon = () => { 
    // Check for a row win
    const rowWins = () => { 
        for(let i = 0; i <= 6; i+=3) {
            if((gameboard.board[i] == 'O' && gameboard.board[i+1] == 'O' && gameboard.board[i+2] == 'O') || (gameboard.board[i] == 'X' && gameboard.board[i+1] == 'X' && gameboard.board[i+2] == 'X') ){ 
                controller.status = true
                controller.method = 'win'
            }
        }
    }
    // Check for a column win
    const columnWins = () => { 
        for(let i = 0; i <= 2; i++) {
            if(gameboard.board[i] == 'O' && gameboard.board[i+3] == 'O' && gameboard.board[i+6] == 'O' || gameboard.board[i] == 'X' && gameboard.board[i+3] == 'X' && gameboard.board[i+6] == 'X'){
                controller.status = true
                controller.method = 'win'
            }
        }
    }
    // Check for a diagonal win
    const diagonalWins = () => { 
        for(let i = 0; i <= 2; i+=2) { 
            if(i == 0) { 
                if(gameboard.board[0] == 'O' && gameboard.board[4] == 'O' && gameboard.board[8] == 'O' || gameboard.board[i] == 'X' && gameboard.board[4] == 'X' && gameboard.board[8] == 'X') { 
                    controller.status = true
                    controller.method = 'win'
                }
            } else if (i == 2) { 
                if(gameboard.board[i] == 'O' && gameboard.board[4] == 'O' && gameboard.board[6] == 'O' || gameboard.board[i] == 'X' && gameboard.board[2] == 'X' && gameboard.board[6] == 'X') {
                    controller.status = true
                }
            } 
        }
    }
    // Checks for a tie
    const tieWin = () => {
        if(controller.status == false && gameboard.board.every(element => element == 'X' || element == 'O')) { 
            controller.status = true
            controller.method = 'tie'
        }
    }
    return {rowWins, columnWins, diagonalWins, tieWin}
}

// Handles click event from players to occupy a new square
function makeMove(element){ 
    console.log('makeMoveRun')
    // Get cell's id number to check with array
    // Checks if player is able to make a move
    if(controls.checkMove(element.id)) {
        gameboard.board[element.id-1] = `${controller.turn.style}`
        element.textContent = `${controller.turn.style}`
    }

    // Checks if after move a player has won or tied
    const result = hasWon()
    result.rowWins()
    result.columnWins() 
    result.diagonalWins() 
    result.tieWin()

    // Alters game controller to next player if game continues
    if(controller.status == false) { 
        if(controller.turn != players[0]) {
            console.log(controller.turn.who, 'BEFORE')
            players.push(controller.turn)
            controller.turn = players.shift()
            controls.updateMessage()
            console.log(controller.turn.who, 'AFTER')
        }
    // Else a player has won or there's a tie
    } else {
        if(controller.method != 'tie'){
            alert('Game is over!' + " " + `${controller.turn.who}` + ' won the game!')
        } else {
            alert('Game is over! It was a tie!')
        }
    }
}

// Add clear board function to reset button
const reset = document.getElementById('reset').addEventListener('click', controls.restart)