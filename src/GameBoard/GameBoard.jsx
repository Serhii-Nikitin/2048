import React from 'react';

export const GameBoard = ({ cells }) => {
  return (
    <>
      {cells.map((cell, i) => (
        <div
          className={cell
            ? `field-cell field-cell--${cell}`
            : 'field-cell'
          }
          key={i}
        >
          {cell
            ? cell
            : ''
          }
        </div>
      ))}
    </>
  );
};
