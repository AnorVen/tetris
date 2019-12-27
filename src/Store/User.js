import React, {Component} from 'react'
import {action, computed, observable, observe} from 'mobx';


class User extends Component{
   user1 = {
     name: '',
     photo: '',

    scope: 0,
    tetris: 0,
    level: 1,
    isPlay: false

  }
   user2 = {
    scope: 0,
    tetris: 0,
    level: 1,
    isPlay: false
  }

  setUser1 = (userData)=>{
    this.user1 = {...this.user1, ...userData}
  }
  setUser2 = (userData)=>{
    this.user2 = {...this.user2, ...userData}
  }
  render() {
    return null
  }
}

export default User