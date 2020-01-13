import React from 'react';
import PropTypes from 'prop-types';
import PlayerData from "./PlayerData";

const Player = ({scores, level, tetris, user}) => {
  return (
    <div className="player">
      <PlayerData id={1}
                  go={() => {}}
                  fetchedUser={user}/>
      <ul id="status">
        <li>Счет: <span data-role="scope">{scores}</span></li>
        <li>Уровень: <span data-role="level">{level}</span></li>
        <li>Тетрисов: <span data-role="tetris">{tetris}</span></li>
      </ul>
    </div>
  );
};

Player.propTypes = {
  user: PropTypes.object,
  scores: PropTypes.number,
  level: PropTypes.number,
  tetris: PropTypes.number,
};

export default Player;