import { useState } from "react";
import { Cpu, RotateCcw } from "lucide-react";

const PLAYER = "X";
const AI = "O";

const EMPTY_BOARD = [
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
];

const WIN_PATTERNS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner(board, player) {
  return WIN_PATTERNS.some(
    ([a, b, c]) =>
      board[a] === player &&
      board[b] === player &&
      board[c] === player
  );
}

function minimax(board, playerChar) {
  const availableSpots = board
    .map((value, index) =>
      value === "" ? index : null
    )
    .filter((value) => value !== null);

  if (checkWinner(board, PLAYER)) {
    return { score: -10 };
  }

  if (checkWinner(board, AI)) {
    return { score: 10 };
  }

  if (availableSpots.length === 0) {
    return { score: 0 };
  }

  const moves = [];

  for (let i = 0; i < availableSpots.length; i++) {
    const move = {};

    move.index = availableSpots[i];

    board[availableSpots[i]] = playerChar;

    if (playerChar === AI) {
      move.score = minimax(
        board,
        PLAYER
      ).score;
    } else {
      move.score = minimax(
        board,
        AI
      ).score;
    }

    board[availableSpots[i]] = "";

    moves.push(move);
  }

  let bestMove;

  if (playerChar === AI) {
    let bestScore = -10000;

    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    let bestScore = 10000;

    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}

function TicTacToeCard() {
  const [board, setBoard] = useState(EMPTY_BOARD);
  const [gameActive, setGameActive] = useState(true);
  const [currentPlayer, setCurrentPlayer] =
    useState(PLAYER);

  const [mode, setMode] =
    useState("unbeatable");

  const [turnText, setTurnText] =
    useState("Your Turn (X)");

  const [gameFinishedStyle, setGameFinishedStyle] =
    useState(false);

  const resetGame = () => {
    setBoard([...EMPTY_BOARD]);
    setGameActive(true);
    setCurrentPlayer(PLAYER);
    setTurnText("Your Turn (X)");
    setGameFinishedStyle(false);
  };

  const finishGame = (winner) => {
    setGameActive(false);

    if (winner) {
      let text;

      if (mode === "pvp") {
        text = `Player ${winner} Wins! 🎉`;
      } else {
        text =
          winner === PLAYER
            ? "You Win! 🎉"
            : "AI Wins! 🤖";
      }

      setTurnText(text);
      setGameFinishedStyle(true);

      return;
    }

    setTurnText("It's a Draw! 🤝");
    setGameFinishedStyle(false);
  };

  const evaluateBoard = (nextBoard) => {
    if (checkWinner(nextBoard, PLAYER)) {
      finishGame(PLAYER);
      return true;
    }

    if (checkWinner(nextBoard, AI)) {
      finishGame(AI);
      return true;
    }

    if (!nextBoard.includes("")) {
      finishGame(null);
      return true;
    }

    return false;
  };

  const makeMove = (index, symbol) => {
    const nextBoard = [...board];

    nextBoard[index] = symbol;

    setBoard(nextBoard);

    return evaluateBoard(nextBoard);
  };

  const makeAiMove = (currentBoard) => {
    let move;

    if (mode === "unbeatable") {
      move = minimax(
        [...currentBoard],
        AI
      ).index;
    } else {
      const available = currentBoard
        .map((value, index) =>
          value === "" ? index : null
        )
        .filter(
          (value) => value !== null
        );

      if (available.length === 0) {
        return;
      }

      move =
        available[
          Math.floor(
            Math.random() *
              available.length
          )
        ];
    }

    if (
      move === undefined ||
      move === null
    ) {
      return;
    }

    const nextBoard = [...currentBoard];

    nextBoard[move] = AI;

    setBoard(nextBoard);

    const finished =
      evaluateBoard(nextBoard);

    if (!finished) {
      setCurrentPlayer(PLAYER);
      setTurnText("Your Turn (X)");
    }
  };

  const playerMove = (index) => {
    if (!gameActive) return;

    if (board[index] !== "") return;

    if (currentPlayer !== PLAYER && mode !== "pvp") {
      return;
    }

    const nextBoard = [...board];

    nextBoard[index] = currentPlayer;

    setBoard(nextBoard);

    const finished =
      evaluateBoard(nextBoard);

    if (finished) {
      return;
    }

    if (mode === "pvp") {
      const nextPlayer =
        currentPlayer === "X"
          ? "O"
          : "X";

      setCurrentPlayer(nextPlayer);
      setTurnText(
        `Turn: Player ${nextPlayer}`
      );

      return;
    }

    setCurrentPlayer(AI);
    setTurnText("AI is thinking... 🤖");

    setTimeout(() => {
      makeAiMove(nextBoard);
    }, 250);
  };

  return (
    <div
      className="
        glass-panel
        rounded-[3rem]
        p-8
        md:p-10
        flex
        flex-col
        h-full
        border-t
        border-white/10
        project-card-reveal
      "
    >
      {/* Header */}
      <div
        className="
          flex
          items-center
          justify-between
          mb-6
        "
      >
        <div className="flex items-center gap-4">
          <div
            className="
              w-12
              h-12
              rounded-2xl
              bg-cyan-500/20
              flex
              items-center
              justify-center
            "
          >
            <Cpu className="text-cyan-400" />
          </div>

          <div>
            <h3 className="text-2xl font-bold">
              Tic-Tac-Toe
            </h3>

            <span className="text-xs font-mono text-slate-500 uppercase">
              Minimax Algorithm AI
            </span>
          </div>
        </div>

        <button
          onClick={resetGame}
          className="
            p-2
            hover:bg-white/10
            rounded-xl
            transition-colors
            text-slate-400
            hover:text-white
          "
          title="Reset Game"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      {/* Game */}
      <div
        className="
          bg-black/40
          rounded-3xl
          p-6
          border
          border-white/5
          mb-8
        "
      >
        {/* Board */}
        <div
          className="
            grid
            grid-cols-3
            gap-3
            mb-6
          "
        >
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() =>
                playerMove(index)
              }
              disabled={
                !gameActive ||
                cell !== ""
              }
              className={`
                ttt-cell
                glass-card
                rounded-xl

                ${
                  cell === "X"
                    ? "text-indigo-400"
                    : ""
                }

                ${
                  cell === "O"
                    ? "text-cyan-400"
                    : ""
                }

                ${
                  !gameActive ||
                  cell !== ""
                    ? "cursor-default"
                    : "cursor-pointer"
                }
              `}
            >
              {cell}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div
          className="
            flex
            flex-col
            md:flex-row
            gap-4
            items-center
            justify-between
          "
        >
          <select
            value={mode}
            onChange={(event) => {
              setMode(event.target.value);
              resetGame();
            }}
            className="
              bg-slate-900/80
              border
              border-white/10
              rounded-xl
              px-4
              py-2
              outline-none
              text-xs
              font-mono
              cursor-pointer
            "
          >
            <option value="unbeatable">
              🤖 UNBEATABLE (MINIMAX)
            </option>

            <option value="easy">
              ⚡ EASY MODE
            </option>

            <option value="pvp">
              👥 VS FRIEND
            </option>
          </select>

          <div
            className={`
              text-sm
              font-bold

              ${
                gameFinishedStyle
                  ? "text-sm font-bold text-emerald-400 animate-bounce"
                  : "text-brand-secondary"
              }
            `}
          >
            {turnText}
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-auto">
        <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-mono border border-white/10">
          Game AI
        </span>

        <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-mono border border-white/10">
          Recursive Logic
        </span>
      </div>
    </div>
  );
}

export default TicTacToeCard;