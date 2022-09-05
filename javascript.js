// Create the game board object 
const gameboard = (() => { 
    const board = new Array(9)
    return {board}
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

//console.log(gameboard.board)

// Checks if the corresponding grid cell is clear in the gameboard array
function checkMove(pos) { 
    for(let i = 0; i < gameboard.board.length; i++) {
        if (i == pos - 1 && gameboard.board[i] != undefined) {
            return false;
        }
    }
    return true;
}

// Handles click event from players to occupy a new square
function makeMove(element){ 
    // Get cell's id number to check with array
    let num = element.id
    // Check if grid cell in array is already occupied
    if(checkMove(num)) {
        gameboard.board[num-1] = 'hi'
        element.textContent += 'hi'
    }
}

const player1 = playerFactory('Sydney')
players.push(player1)
const player2 = playerFactory('Vaughn') 
players.push(player2)

// Add click event listener to each grid cell
let grid = document.getElementsByClassName('cells')
grid = Array.from(grid)
grid.forEach( (element) => {
    element.addEventListener('click', () => {
        makeMove(element)
    })
})




