import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import './GameBoard.scss';

export const GameBoard = ({ cells }) => (
  <>
    {cells.map(cell => (
      <div
        className={cell
          ? `field-cell field-cell--${cell}`
          : 'field-cell'
        }
        key={uuidv4()}
      >
        {cell || ''}
      </div>
    ))}
  </>
);

GameBoard.propTypes = {
  cells: PropTypes.arrayOf(
    PropTypes.number.isRequired,
  ).isRequired,
};
