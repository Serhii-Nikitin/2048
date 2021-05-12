import React, { useState } from 'react';
import './App.scss';
import { GameBoard } from './GameBoard';

const rows = 4;
const columns = 4;
const initialArray = Array(rows * columns).fill(0);

export const App = () => {
  const [cells, setCells] = useState(initialArray)
  const [isGameStarted, setIsGameStarted] = useState(false)

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
      // setCells(current => current
      //   .map((cell, index) => (
      //     index === random
      //       ? getNumber()
      //       : cell
      //   ))
      // )
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
            if (cell === array[index + 1]) {
              cell *= 2;
              currentIndex = (index + 1);
            }

            if (index === currentIndex) {
              cell = 0;
            }

            return cell;
          })
          .filter(cell => cell)

        const emptyCells = Array(columns - filtredRow.length).fill(0)
        const newRow = filtredRow.concat(emptyCells)

        newBoard = newBoard.concat(newRow)
        console.log(row, filtredRow, newRow);
      }
    }

    addNewNumber(newBoard)
    console.log(newBoard);
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
          .map((cell, index, array) => {
            if (cell === array[index + 1]) {
              cell = 0;
              currentIndex = (index + 1);
            }

            if (index === currentIndex) {
              cell *= 2;
            }

            return cell;
          })
          .filter(cell => cell)
        const emptyCells = Array(columns - filtredRow.length).fill(0)
        const newRow = emptyCells.concat(filtredRow)

        newBoard = newBoard.concat(newRow)
        console.log(row, filtredRow, newRow);
      }
    }

    addNewNumber(newBoard)
  }

  // функции для движения ячеек вверх
  const moveTop = () => {
    let newBoard = [];
    for (let i = 0; i < rows - 1; i++) {
      const column = [
        cells[i],
        cells[i + rows],
        cells[i + rows * 2],
        cells[i + rows * 3]
      ]
    }

    addNewNumber(newBoard)
  }

  console.log('render');

  return (
    <div className="container">
      <div className="game-header">
        <h1>2048</h1>
        <div className="controls">
          <p className="info">
            {`Score: `}
            <span className="game-score">0</span>
          </p>
          <button
            type="button"
            className="button start"
            onClick={() => handleButton()}
          >
            Start
          </button>
        </div>
      </div>

      <div className="game-field" onKeyUp={() => console.log('hi')}>
        <GameBoard cells={cells}/>
      </div>

      <button type="button" onClick={() => {
        moveLeft();
      }}>left</button>
      <button type="button" onClick={() => {
        moveRight();
      }}>right</button>

      <div className="message-container">
        {/* <p className="message message-lose hidden">
          You lose! Restart the game?
        </p>
        <p className="message message-win hidden">
          Winner! Congrats! You did it!
        </p> */}
        <p className="message message-start">
          Press "Start" to begin game. Good luck!
        </p>
      </div>
    </div>
  );
};
