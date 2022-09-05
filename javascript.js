// Create the game board object 
const gameboard = (() => { 
    const board = new Array(9)
    return {board}
})();

// Create game controller
const controller = (() => {
    // Turn property keeps track of who makes the current move
    const turn = player1
    // Status property remains false until someone wins or a tie
    const status = false;
    return{turn, status}
})();

// Keep track of the players
let players = []

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

//console.log(gameboard.board)

// Checks if the corresponding grid cell is clear in the gameboard array
function checkMove(pos) { 
    for(let i = 0; i < gameboard.board.length; i++) {
        if (i == pos - 1 && gameboard.board[i] != undefined) {
            return false
        }
    } return true
}

// Returns true if a player has won otherwise returns false
function hasWon() { 
    const board = gameboard.board
    // Check for row wins 
    if(board[0] == board[1] == board[2] || board[3] == board[4] == board[5]
        || board[6] == board[7] == board[8]) { 
            return true
        }
    // Check for column wins
    else if(board[0]== board[3] == board[6] || board[1] == board[4] == board[7] ||
        board[2] == board[5] == board[8]) { 
            return true
    } 
    // Check for diagonal wins
    else if(board[0] == board[4] == board[8] || board[6] == board[4] == board[2]) {
        return true
    // Checks for a tie
    } else if(board.every(element => element !== undefined)) { 
        return true
    // No one has won yet
    } else return false
}

// Handles click event from players to occupy a new square
function makeMove(element){ 
    // Get cell's id number to check with array
    let num = element.id
    // Checks if player is able to make a move
    if(checkMove(num)) {
        gameboard.board[num-1] = 'hi'
        element.textContent += `${num - 1}`
    }
    // Checks if after move a player has won

    // Alters game controller to next player if game continues
}

// Add click event listener to each grid cell
let grid = document.getElementsByClassName('cells')
grid = Array.from(grid)
grid.forEach( (element) => {
    element.addEventListener('click', () => {
        makeMove(element)
    })
})




