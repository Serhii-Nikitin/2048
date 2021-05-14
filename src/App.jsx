import React, { useState } from 'react';
import './App.scss';
import { GameBoard } from './GameBoard';

const rowsCount = 4;
const columnsCount = 4;
const initialArray = Array(rowsCount * columnsCount).fill(0);

export const App = () => {
  const [score, setScore] = useState(0);
  const [cells, setCells] = useState(initialArray);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [isLose, setIsLose] = useState(false);

  const randomIndex = () => Math.floor(Math.random() * cells.length);

  const getStart = () => {
    const firstRandomIndex = randomIndex();
    const secondRandomIndex = randomIndex();

    if (firstRandomIndex !== secondRandomIndex) {
      setCells(current => (current
        .map((cell, index) => (
          index === firstRandomIndex || index === secondRandomIndex
            ? getRandomNumber()
            : cell
        ))
      ));
      setIsGameStarted(true);
      setIsWin(false);
      setIsLose(false);
      setScore(0);
    } else {
      getStart();
    }
  };

  const handleStart = () => {
    setCells(initialArray);
    getStart();
  };

  function getRandomNumber() {
    const possibleNumbers = [2, 4].sort(() => Math.random() - 0.5);

    return possibleNumbers[0];
  }

  const addNewNumber = (cellsList) => {
    const position = randomIndex();

    if (cellsList[position] === 0) {
      const newArray = cellsList.map((item, index) => (index === position
        ? getRandomNumber()
        : item
      ));

      setCells(newArray);
    } else {
      addNewNumber(cellsList);
    }
  };

  const rowsFilter = (row) => {
    let currentIndex;

    return row
      .map((cell, index, array) => {
        let newCell = cell;

        if (index === currentIndex) {
          newCell = 0;
          currentIndex = null;
        } else if (cell === array[index + 1]) {
          newCell *= 2;
          setScore(current => current + newCell);
          currentIndex = (index + 1);
        }

        return newCell;
      })
      .filter(cell => cell);
  };

  const columnsFilter = (column) => {
    let currentIndex;

    return column
      .map((cell, index, array) => {
        let newCell = cell;

        if (cell === 2048) {
          setIsWin(true);
        } else if (index === currentIndex) {
          newCell = 0;
          currentIndex = null;
        } else if (cell === array[index + 1]) {
          newCell *= 2;
          setScore(current => current + newCell);
          currentIndex = (index + 1);
        }

        return newCell;
      })
      .filter(cell => cell);
  };

  const moveCells = (keyName) => {
    let newBoard = [];

    switch (keyName) {
      case 'ArrowLeft':
        for (let i = 0; i < cells.length - 1; i += 1) {
          if (i % 4 === 0) {
            const row = [cells[i], cells[i + 1], cells[i + 2], cells[i + 3]];
            let filteredRow = row.filter(cell => cell);

            filteredRow = rowsFilter(filteredRow);

            const emptyCells = Array(columnsCount - filteredRow.length).fill(0);
            const newRow = filteredRow.concat(emptyCells);

            newBoard = newBoard.concat(newRow);
          }
        }

        break;

      case 'ArrowRight':
        for (let i = 0; i < cells.length - 1; i += 1) {
          if (i % 4 === 0) {
            const row = [cells[i], cells[i + 1], cells[i + 2], cells[i + 3]];
            let filteredRow = row.filter(cell => cell).reverse();

            filteredRow = rowsFilter(filteredRow).reverse();

            const emptyCells = Array(columnsCount - filteredRow.length).fill(0);
            const newRow = emptyCells.concat(filteredRow);

            newBoard = newBoard.concat(newRow);
          }
        }

        break;

      case 'ArrowUp':
        for (let i = 0; i < rowsCount; i += 1) {
          const column = [
            cells[i],
            cells[i + rowsCount],
            cells[i + rowsCount * 2],
            cells[i + rowsCount * 3],
          ];

          let filteredColumn = column.filter(cell => cell);

          filteredColumn = columnsFilter(filteredColumn);

          const emptyCells = Array(rowsCount - filteredColumn.length).fill(0);
          const newColumn = filteredColumn.concat(emptyCells);
          const [firstCell, secondCell, thirdCell, fourCell] = newColumn;

          newBoard[i] = firstCell;
          newBoard[i + rowsCount] = secondCell;
          newBoard[i + rowsCount * 2] = thirdCell;
          newBoard[i + rowsCount * 3] = fourCell;
        }

        break;

      case 'ArrowDown':
        for (let i = 0; i < rowsCount; i += 1) {
          const column = [
            cells[i],
            cells[i + rowsCount],
            cells[i + rowsCount * 2],
            cells[i + rowsCount * 3],
          ];

          let filteredColumn = column.filter(cell => cell).reverse();

          filteredColumn = columnsFilter(filteredColumn)
            .reverse();

          const emptyCells = Array(rowsCount - filteredColumn.length).fill(0);
          const newColumn = emptyCells.concat(filteredColumn);

          const [firstCell, secondCell, thirdCell, fourCell] = newColumn;

          newBoard[i] = firstCell;
          newBoard[i + rowsCount] = secondCell;
          newBoard[i + rowsCount * 2] = thirdCell;
          newBoard[i + rowsCount * 3] = fourCell;
        }

        break;

      default:
        break;
    }

    const isBoardChange = newBoard
      .every((cell, index) => cell === cells[index]);

    const isDuplicates = newBoard.some((cell, index, array) => {
      if (cell === 0) {
        return true;
      }

      if (cell === array[index + rowsCount]) {
        return true;
      }

      if ((index % columnsCount) !== 3
        && cell === array[index + 1]) {
        return true;
      }

      return false;
    });

    if (newBoard.includes(2048)) {
      setIsWin(true);
      setCells(newBoard);
    } else if (!isDuplicates) {
      setIsLose(true);
      setCells(newBoard);
    } else if (!isBoardChange) {
      addNewNumber(newBoard);
    }
  };

  return (
    <div
      className="page-container"
      role="presentation"
      /* eslint-disable-next-line */
      tabIndex={1}
      onKeyUp={(e) => {
        if (!isWin && !isLose) {
          moveCells(e.key);
        }
      }}
    >
      <div className="container">
        <div className="game-header">
          <h1 className="title">2048</h1>
          <div className="controls">
            <p className="info">
              {`Score: `}
              <span>{score}</span>
            </p>
            <button
              type="button"
              className={isGameStarted
                ? 'button restart'
                : 'button start'
              }
              onClick={() => handleStart()}
            >
              {isGameStarted
                ? 'Restart'
                : 'Start'
              }
            </button>
          </div>
        </div>

        <div className="game-field">
          <GameBoard cells={cells} />
        </div>

        <div className="message-container">
          {isLose && (
            <p className="message">
              You lose! Restart the game?
            </p>
          )}
          {isWin && (
            <p className="message message-win">
              Winner! Congrats! You did it!
            </p>
          )}
          {!isGameStarted && (
            <p className="message">
              Press &quot;Start&quot; to begin game. Good luck!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
