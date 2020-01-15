import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Tetris from "../../tetris";
import withStore from "../../hocs/withStore";
import Player from './Player'

class GamePleace extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef()

  }

  componentDidMount() {
    const tetris = new Tetris(
      this.canvas.current,
      'wasd');
  }


  render() {

    return (

        <div className="player1">
          <Player/>
          <div className="canvas1">
            <canvas ref={this.canvas} width={300} height={600}>Ваш браузер не поддерживает canvas.
            </canvas>
          </div>
        </div>
    );
  }
}

GamePleace.propTypes = {};

export default withStore(GamePleace);