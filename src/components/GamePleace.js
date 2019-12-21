import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Tetris from "../tetris";
class GamePleace extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef()

  }

  componentWillMount() {

  }

  componentDidMount() {
    console.log(this.canvas)
   const tetris = new Tetris(
      this.canvas.current,
      'wasd');
    tetris.start();

  }

  componentWillReceiveProps(nextProps) {

  }

  shouldComponentUpdate(nextProps, nextState) {

  }

  componentWillUpdate(nextProps, nextState) {

  }

  componentDidUpdate(prevProps, prevState) {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div className="canvas1">
        <canvas ref={this.canvas} width={300} height={600}>Ваш браузер не поддерживает canvas.</canvas>
      </div>
    );
  }
}

GamePleace.propTypes = {};

export default GamePleace;