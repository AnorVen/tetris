import React, { Component } from 'react'
import {action, computed, observable, observe} from 'mobx';

class Scopes extends Component {
  scopes = 0;

   tetris = 0;
level = 1 + this.scopes % 3;

addScopes = (scope) => {
    this.scopes += scope
  }

addTetris = (tetris) => {
    this.tetris += tetris;
    this.addScopes(4)
  }
  render() {
  return null
  }
}

export default Scopes()