import React, { useState } from 'react';
import './App.scss';
import { GameBoard } from './GameBoard';

const rows = 4;
const columns = 4;
const initialArray = Array(rows * columns).fill(0);

export const App = () => {
  const [score, setScore] = useState(0);
  const [cells, setCells] = useState(initialArray);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [isLose, setIsLose] = useState(false);

  //функция для генерации рандомного индекса
  const randomIndex = () => Math.floor(Math.random() * cells.length);

  // функция для начала игры
  const getStart = () => {
    const firstRandom = randomIndex();
    const secondRandom = randomIndex();

    if (firstRandom !== secondRandom) {
      setCells(current => current
        .map((cell, index) => (
          index === firstRandom || index === secondRandom
            ? getNumber()
            : cell
        ))
      )
      setIsGameStarted(true);
      setIsWin(false)
      setIsLose(false)
      setScore(0)
    } else {
      getStart();
    }
  }

  // функция для кнопки старт
  const handleButton = () => {
    if (isGameStarted) {
      setCells(initialArray);
    } 
    
    getStart();
  }

  // функция для генерации числа 2 или 4
  function getNumber() {
    const possibleNumbers = [2, 4].sort(() => Math.random() - 0.5);

    return possibleNumbers[0];
  }

  //функция для добавления нового числа
  const addNewNumber = (array) => {
    const random = randomIndex();

    if (array[random] === 0) {
      setCells(array.map((item, index) => index === random
        ? getNumber()
        : item
      ))
    } else {
      addNewNumber(array);
    }
  }


  // функции для движения ячеек влево
  const moveLeft = () => {
    let newBoard = [];
    for (let i = 0; i < cells.length - 1; i++) {
      if (i % 4 === 0) {
        const row = [cells[i], cells[i + 1], cells[i + 2], cells[i + 3]]
        let filtredRow = row.filter(cell => cell);
        let currentIndex;
        filtredRow = filtredRow
          .map((cell, index, array) => {
            if (index === currentIndex) {
              cell = 0;
              currentIndex = null;
            } else if (cell === array[index + 1]) {
              cell *= 2;
              setScore(current => current + cell);
              currentIndex = (index + 1);
            }

            return cell;
          })
          .filter(cell => cell)

        const emptyCells = Array(columns - filtredRow.length).fill(0);
        const newRow = filtredRow.concat(emptyCells);

        newBoard = newBoard.concat(newRow)
      }
    }

    const isBoardChange = newBoard.every((item, index) => item === cells[index]);
    const isDuplicates = newBoard.some((cell, index, array) => {
      if (cell === array[index + columns] && cell !== 0) {
        return true;
      }
    })

    if (newBoard.includes(2048)) {
      setIsWin(true);
      setCells(newBoard);
    } else if (!newBoard.includes(0) && !isDuplicates) {
      setIsLose(true);
      setCells(newBoard);
    } else if (!isBoardChange) {
      addNewNumber(newBoard)
    }
  }


  // функции для движения ячеек вправо
  const moveRight = () => {
    let newBoard = [];
    for (let i = 0; i < cells.length - 1; i++) {
      if (i % 4 === 0) {
        const row = [cells[i], cells[i + 1], cells[i + 2], cells[i + 3]]
        let filtredRow = row.filter(cell => cell);
        let currentIndex;
        filtredRow = filtredRow
          .reverse()
          .map((cell, index, array) => {
            if (index === currentIndex) {
              cell *= 2;
              setScore(current => current + cell);
              currentIndex = null;
            } else if (cell === array[index + 1]) {
              cell = 0;
              currentIndex = (index + 1);
            }

            return cell;
          })
          .filter(cell => cell)
          .reverse()

        const emptyCells = Array(columns - filtredRow.length).fill(0);
        const newRow = emptyCells.concat(filtredRow);

        newBoard = newBoard.concat(newRow)
      }
    }

    const isBoardChange = newBoard.every((item, index) => item === cells[index]);
    const isDuplicates = newBoard.some((cell, index, array) => {
      if (cell === array[index + columns] && cell !== 0) {
        return true;
      }
    })


    if (newBoard.includes(2048)) {
      setIsWin(true);
      setCells(newBoard);
    } else if (!newBoard.includes(0) && !isDuplicates) {
      setIsLose(true);
      setCells(newBoard);
    } else if (!isBoardChange) {
      addNewNumber(newBoard)
    }
  }

  // функции для движения ячеек вверх
  const moveTop = () => {
    let newBoard = [];
    for (let i = 0; i < rows; i++) {
      const column = [
        cells[i],
        cells[i + rows],
        cells[i + rows * 2],
        cells[i + rows * 3]
      ]

      console.log(column);

      let filtredColumn = column.filter(cell => cell);

      let currentIndex;
      filtredColumn = filtredColumn
        .map((cell, index, array) => {
          if (cell === 2048) {
            setIsWin(true)
          } else if (index === currentIndex) {
            cell = 0;
            currentIndex = null;
          } else if (cell === array[index + 1]) {
            cell *= 2;
            setScore(current => current + cell);
            currentIndex = (index + 1);
          }

          return cell;
        })
        .filter(cell => cell)

      const emptyCells = Array(rows - filtredColumn.length).fill(0);
      const newColumn = filtredColumn.concat(emptyCells);

      newBoard[i] = newColumn[0];
      newBoard[i + rows] = newColumn[1];
      newBoard[i + rows * 2] = newColumn[2];
      newBoard[i + rows * 3] = newColumn[3];
    }
    const isBoardChange = newBoard.every((item, index) => item === cells[index]);
    const isDuplicates = newBoard.some((cell, index, array) => {
      if (cell === array[index + rows] && cell !== 0) {
        return true;
      }
    })

    if (newBoard.includes(2048)) {
      setIsWin(true);
      setCells(newBoard);
    } else if (!newBoard.includes(0) && !isDuplicates) {
      setIsLose(true);
      setCells(newBoard);
    } else if (!isBoardChange) {
      addNewNumber(newBoard)
    }
  }

  // функции для движения ячеек вниз
  const moveBottom = () => {
    let newBoard = [];
    for (let i = 0; i < rows; i++) {
      const column = [
        cells[i],
        cells[i + rows],
        cells[i + rows * 2],
        cells[i + rows * 3]
      ]

      console.log(column);

      let filtredColumn = column.filter(cell => cell);

      let currentIndex;
      filtredColumn = filtredColumn
        .reverse()
        .map((cell, index, array) => {
          if (cell === 2048) {
            setIsWin(true)
          } else if (index === currentIndex) {
            cell *= 2;
            setScore(current => current + cell);
            currentIndex = null;
          } else if (cell === array[index + 1]) {
            cell = 0;
            currentIndex = (index + 1);
          }

          return cell;
        })
        .filter(cell => cell)
        .reverse()

      console.log(filtredColumn);
      const emptyCells = Array(rows - filtredColumn.length).fill(0);
      const newColumn = emptyCells.concat(filtredColumn);

      newBoard[i] = newColumn[0];
      newBoard[i + rows] = newColumn[1];
      newBoard[i + rows * 2] = newColumn[2];
      newBoard[i + rows * 3] = newColumn[3];
    }

    const isBoardChange = newBoard.every((item, index) => item === cells[index]);
    const isDuplicates = newBoard.some((cell, index, array) => {
      if (cell === array[index + rows] && cell !== 0) {
        return true;
      }
    })

    if (newBoard.includes(2048)) {
      setIsWin(true);
      setCells(newBoard);
    } else if (!newBoard.includes(0) && !isDuplicates) {
      setIsLose(true);
      setCells(newBoard);
    } else if (!isBoardChange) {
      addNewNumber(newBoard)
    }
  }

  console.log('render');

  return (
    <div
      className="page-container"
      tabIndex={1}
      onKeyUp={(e) => {
        if (e.key === 'ArrowUp' && !isWin && !isLose) {
          moveTop();
        }

        if (e.key === 'ArrowLeft' && !isWin && !isLose) {
          moveLeft();
        }

        if (e.key === 'ArrowRight' && !isWin && !isLose) {
          moveRight();
        }

        if (e.key === 'ArrowDown' && !isWin && !isLose) {
          moveBottom();
        }
        console.log(e);
      }}
    >
      <div className="container">
        <div className="game-header">
          <h1>2048</h1>
          <div className="controls">
            <p className="info">
              {`Score: `}
              <span className="game-score">{score}</span>
            </p>
            <button
              type="button"
              className="button start"
              onClick={() => handleButton()}
            >
              {isGameStarted
                ? 'Restart'
                : 'Start'
              }
            </button>
          </div>
        </div>

        <div className="game-field" onKeyUp={() => console.log('hi')}>
          <GameBoard cells={cells}/>
        </div>

        <div className="message-container">
          {isLose && (
            <p className="message message-lose">
              You lose! Restart the game?
            </p>
          )}
          {isWin && (
            <p className="message message-win">
              Winner! Congrats! You did it!
            </p>
          )}
          {!isGameStarted && (
            <p className="message message-start">
              Press "Start" to begin game. Good luck!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
