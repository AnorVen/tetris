import {action, computed, observable, runInAction} from 'mobx';

export default class User  {
  constructor(rootStore){
    this.rootStore = rootStore;
    this.api = this.rootStore.api.products;
  }
  @observable playersValue =  1;

  @observable user1 = {
    name: '',
    photo: '',
    scope: 0,
    tetris: 0,
    level: 1,
    isPlay: false

  }

  @observable user2 = {
    name: '',
    photo: '',
    scope: 0,
    tetris: 0,
    level: 1,
    isPlay: false
  }

  @action selectPlayersVal = (val)=>{
    return  this.playersValue = val === 1 ? 1: 2;
  }
  @action setUser1 = (userData) => {
   return  this.user1 = {...this.user1, ...userData}
  }
  @action setUser2 = (userData) => {
    return this.user2 = {...this.user2, ...userData}
  }
}
