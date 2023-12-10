// 1. Initialize board as a 2D array
let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

// 2. Function to check for a winner
function checkWinner() {
  // Check rows, columns, and diagonals
  for (let i = 0; i < 3; i++) {
    if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== '') {
      return board[i][0];
    }
    if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== '') {
      return board[0][i];
    }
  }
  if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== '') {
    return board[0][0];
  }
  if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== '') {
    return board[0][2];
  }
  return null;
}

// 3. Function to handle player move

async function addSoulPoints(username, pointsToAdd) {
  const response = await fetch('/api/add_soul_points', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: username, points: pointsToAdd })
  });

  const result = await response.json();
  return result.new_soul_points;
}

async function playerMove(event) {
  let row = parseInt(event.target.dataset.row);
  let col = parseInt(event.target.dataset.col);

  // Place 'X' for player
  if (board[row][col] === '') {
    board[row][col] = 'X';
    event.target.innerHTML = 'X';

      // ... [rest of the playerMove function]

    let winner = checkWinner();
    if (winner !== null) {
        alert(winner + ' wins!');
          // Check if the winner is the player
        if (winner === 'X') {
              // Assume username is stored in localStorage, and 5 points are awarded for a win
            const username = localStorage.getItem('username');
                if (username) {
                    try {
                        const newSoulPoints = await addSoulPoints(username, 3);
                      alert(`Congratulations! You've earned soul points. New soul points: ${newSoulPoints}`);
                    } catch (error) {
                      console.error('Error adding soul points:', error);
                      alert('An error occurred while adding soul points.');
                    }
                  } else {
                    console.error('Username is not found in localStorage');
                  }
                }
                // Terminate the game since we have a winner
                return;
              }

      // ... [rest of the playerMove function]


    // Place 'O' for computer at random empty cell
    let emptyCells = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === '') {
          emptyCells.push([i, j]);
        }
      }
    }

    if (emptyCells.length > 0) {
      let randomIndex = Math.floor(Math.random() * emptyCells.length);
      let [randomRow, randomCol] = emptyCells[randomIndex];
      board[randomRow][randomCol] = 'O';
      document.querySelector(`button[data-row='${randomRow}'][data-col='${randomCol}']`).innerHTML = 'O';

        // ... [rest of the playerMove function]

        let winner = checkWinner();
        if (winner !== null) {
            alert(winner + ' wins!');
            // Check if the winner is the player
            if (winner === 'X') {
                // Assume username is stored in localStorage, and 5 points are awarded for a win
                const username = localStorage.getItem('username');
                      if (username) {
                        try {
                          const newSoulPoints = await addSoulPoints(username, 3);
                          alert(`Congratulations! You've earned soul points. New soul points: ${newSoulPoints}`);
                        } catch (error) {
                          console.error('Error adding soul points:', error);
                          alert('An error occurred while adding soul points.');
                        }
                      } else {
                        console.error('Username is not found in localStorage');
                      }
                    }
                    // Terminate the game since we have a winner
                    return;
                  }

        // ... [rest of the playerMove function]

    }
  }
}

// 4. Attach event listeners
document.querySelectorAll('.cell').forEach((cell, index) => {
  let row = Math.floor(index / 3);
  let col = index % 3;
  cell.dataset.row = row;
  cell.dataset.col = col;
  cell.addEventListener('click', playerMove);
});

// 5. Reset game board
document.getElementById('reset').addEventListener('click', () => {
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  document.querySelectorAll('.cell').forEach(cell => {
    cell.innerHTML = '';
  });
});