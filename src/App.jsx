import "./App.css";

function App() {
  return (
    <>
      <div className="leaderboard">
        <div className="title">Tic-Tac-Toe</div>
        <div className="subtitle">in React</div>
        <div className="winner"></div>
      </div>

      <div className="board">
        <div className="row">
          <div className="cell idle"></div>
          <div className="cell idle"></div>
          <div className="cell idle"></div>
        </div>
        <div className="row">
          <div className="cell idle"></div>
          <div className="cell idle"></div>
          <div className="cell idle"></div>
        </div>
        <div className="row">
          <div className="cell idle"></div>
          <div className="cell idle"></div>
          <div className="cell idle"></div>
        </div>
      </div>
    </>
  );
}

let rows = document.querySelectorAll(".row");
let cells = document.querySelectorAll(".cell");
let board = Array.from({ length: 3 }, () => Array(3).fill(null));

let winner = document.querySelector(".winner");

rows.forEach((row, r) => (row.id = r));
cells.forEach((cell, id) => (cell.id = id % 3));

const players = new Map([
  ["X", "crossed"],
  ["O", "circled"],
]);

let currentPlayer = "X";

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (!cell.classList.contains("idle")) return;

    let curRow = parseInt(cell.parentElement.id);
    let curCell = parseInt(cell.id);

    board[curRow][curCell] = currentPlayer;

    cell.classList.add(players.get(currentPlayer));
    cell.classList.remove("idle");

    if (checkWin(currentPlayer)) {
      winHandler(currentPlayer);
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
  });
});

function checkWin(player) {
  const winningCombos = [
    // Horizontal
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    // Vertical
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    // Cross
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [2, 0],
      [1, 1],
      [0, 2],
    ],
  ];

  return winningCombos.some((combo) =>
    combo.every(([x, y]) => board[x][y] === player)
  );
}

function resetTable() {
  cells.forEach((cell) => {
    cell.classList.remove("crossed", "circled");
    cell.classList.add("idle");
  })
}

function winHandler(player) {
  board = Array.from({ length: 3 }, () => Array(3).fill(null));
  resetTable();

  winner.innerHTML = `${player} wins!`;

  currentPlayer = "X";
}

export default App;
