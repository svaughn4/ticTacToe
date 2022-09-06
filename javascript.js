// Add click event listener to each grid cell
let grid = document.getElementsByClassName('cells')
grid = Array.from(grid)
grid.forEach( (element) => {
    element.addEventListener('mouseup', (e) => {
        if(controller.status == false) {
            makeMove(element)
        } else {
            e.stopPropagation()
        }
    })
})

// Create the game board object 
let gameboard = (() => { 
    let board = ['-', '-', '-', '-', '-', '-', '-', '-', '-'] 
    return {board}
})();

const board = gameboard.board

// Keep track of the players
let players = []

// Add click event listener to form submit button
const submit = document.getElementById('submit')
const name1 = document.getElementById('player1')
const name2= document.getElementById('player2')


// Submit button sends object to player factory function
submit.addEventListener('click', () => { 
    const player1 = playerFactory(name1.value)
    players.push(player1)
    const player2 = playerFactory(name2.value)
    players.push(player2)
    controller.turn = player1
    console.log(controller.turn)
    controls.updateMessage()
})

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
    let turn = players[0]
    // Status property remains false until someone wins or a tie
    let status = false
    // Method property as to the kind of result; tie or win 
    let method = ''
    return{turn, status, method}
})();

const controls = (() => {
    const updateMessage = () => {
        let cur = controller.turn
        message.textContent = `${cur.who}` + ', select a square'
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
        grid.forEach((element) => { 
            element.textContent = ""
        })
        gameboard.status = false
        players = []
    }
    return {updateMessage, checkMove, restart}
})() 




// Updates controller status to true if a player has won otherwise remains false
const hasWon = () => { 
    // Check for a row win
    const rowWins = () => { 
        for(let i = 0; i <= 6; i+=3) { 
            //console.log(i, i+1, i+2, 'row', controller.status)
            console.log(board[i], board[i+1], board[i+2])
            if((board[i] == 'O' && board[i+1] == 'O' && board[i+2] == 'O') || (board[i] == 'X' && board[i+1] == 'X' && board[i+2] == 'X') ){ 
                controller.status = true
                controller.method = 'win'
                console.log('row')
            }
        }
    }
    // Check for a column win
    const columnWins = () => { 
        for(let i = 0; i <= 2; i++) {
            if(board[i] == 'O' && board[i+3] == 'O' && board[i+6] == 'O' || board[i] == 'X' && board[i+3] == 'X' && board[i+6] == 'X'){
                controller.status = true
                controller.method = 'win'
                console.log('column')
            }
        }
    }
    // Check for a diagonal win
    const diagonalWins = () => { 
        for(let i = 0; i <= 2; i+=2) { 
            if(i == 0) { 
                if(board[0] == 'O' && board[4] == 'O' && board[8] == 'O' || board[i] == 'X' && board[4] == 'X' && board[8] == 'X') { 
                    controller.status = true
                    controller.method = 'win'
                    console.log('diagonal')
                }
            } else if (i == 2) { 
                if(board[i] == 'O' && board[4] == 'O' && board[6] == 'O' || board[i] == 'X' && board[2] == 'X' && board[6] == 'X') {
                    controller.status = true
                    console.log('diagonal')
                }
            } 
        }
    }
    // Checks for a tie
    const tieWin = () => {
        if(controller.status == false && board.every(element => element == 'X' || element == 'O')) { 
            controller.status = true
            controller.method = 'tie'
            console.log('tie')
        }
    }
    return {rowWins, columnWins, diagonalWins, tieWin}
}

// Handles click event from players to occupy a new square
function makeMove(element){ 
    // Get cell's id number to check with array
    let num = element.id
    let who = controller.turn
    // Checks if player is able to make a move
    if(controls.checkMove(num)) {
        gameboard.board[num-1] = `${who.style}`
        element.textContent = `${who.style}`
    }

    // Checks if after move a player has won or tied
    const result = hasWon()
    result.rowWins()
    result.columnWins() 
    result.diagonalWins() 
    result.tieWin()

    // Alters game controller to next player if game continues
    if(controller.status == false) { 
        // Switch the turn to the other player
        if(controller.turn == players[0]) {
            controller.turn = players[1]
        } else controller.turn = players[0]
        controls.updateMessage()
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
const reset = document.getElementById('reset').addEventListener('click', () => controls.restart())


// Show a win display