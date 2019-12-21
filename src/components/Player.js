import React from 'react';
import PropTypes from 'prop-types';

const Player = ({name, scores, level, tetris, photo}) => {

  return (
    <div className="player">
      <div className="photo">
        <img src={photo} alt=""/>
        <p className="name">{name}</p>
      </div>
      <ul id="status">
        <li>Счет: <span data-role="scope">{scores}</span></li>
        <li>Уровень: <span data-role="level">{level}</span></li>
        <li>Тетрисов: <span data-role="tetris">{tetris}</span></li>
      </ul>
    </div>
  );
};

Player.propTypes = {
  name: PropTypes.string,
  scores: PropTypes.number,
  level: PropTypes.number,
  tetris: PropTypes.number,
  photo:PropTypes.string
};

export default Player;