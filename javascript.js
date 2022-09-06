// Add click event listener to each grid cell
let grid = document.getElementsByClassName('cells')
grid = Array.from(grid)
grid.forEach( (element) => {
    element.addEventListener('mouseup', () => {
        makeMove(element)
    })
})

// Create the game board object 
const gameboard = (() => { 
    const board = ['-', '-', '-', '-', '-', '-', '-', '-', '-']

    const clear = () => { 
        board = ['-', '-', '-', '-', '-', '-', '-', '-', '-']
        grid.forEach((element) => { 
            element.textContent = ""
        })
    }
    return {board}
})();

const board = gameboard.board

// Keep track of the players
let players = []

// Message field on the page
let message = document.getElementById('message')

// Create a player object with their name and board mark
const playerFactory = (name) => {
    if(players.length == 0) { 
        const style = 'X'
        return {name, style}
    } else {
        const style = 'O'
        return {name, style}
    }
}

const player1 = playerFactory('Sydney')
players.push(player1)
const player2 = playerFactory('Vaughn') 
players.push(player2) 

// Create game controller
const controller = (() => {
    // Turn property keeps track of who makes the current move
    const turn = player1
    // Status property remains false until someone wins or a tie
    const status = false;
    return{turn, status}
})();

function updateMessage() {
    message.textContent = `${controller.turn.name}` + ', select a square'
}

updateMessage()

// Checks if the corresponding grid cell is clear in the gameboard array
function checkMove(pos) { 
    for(let i = 0; i < gameboard.board.length; i++) {
        if (i == pos - 1 && gameboard.board[i] != '-') {
            return false
        }
    } return true
}


// Updates controller status to true if a player has won otherwise remains false
const hasWon = () => { 
    // Check for a row win
    const rowWins = () => { 
        for(let i = 0; i <= 6; i+=3) { 
            //console.log(i, i+1, i+2, 'row', controller.status)
            console.log(board[i], board[i+1], board[i+2])
            if((board[i] == 'O' && board[i+1] == 'O' && board[i+2] == 'O') || (board[i] == 'X' && board[i+1] == 'X' && board[i+2] == 'X') ){ 
                controller.status = true
                console.log('row')
            }
        }
    }
    // Check for a column win
    const columnWins = () => { 
        for(let i = 0; i <= 2; i++) {
            if(board[i] == 'O' && board[i+3] == 'O' && board[i+6] == 'O' || board[i] == 'X' && board[i+3] == 'X' && board[i+6] == 'X'){
                controller.status = true
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
    if(checkMove(num)) {
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
        if(controller.turn == player1) {
            controller.turn = player2
        } else controller.turn = player1
        updateMessage()

    // Else a player has won or there's a tie
    } else {
        alert('Game is over!' + " " + `${controller.turn.name}` + ' won the game!')
        
    }
}


