import {action, computed, observable, runInAction} from 'mobx';

export default class User  {
  constructor(rootStore){
    this.rootStore = rootStore;
    this.api = this.rootStore.api.products;
  }
  @observable playersValue =  1;

  @observable user = {
    first_name: '',
    last_name: '',
    photo: '',
    scope: 0,
    tetris: 0,
    level: 0,
    isPlay: false,
    id: 0,
    photo_200: '',
    city:{},
    scopes: null
  }

  @action setScopes = (val)=>{
      this.user.scopes = val;
  }

  @action selectPlayersVal = (val)=>{
    return  this.playersValue = val === 1 ? 1: 2;
  }
  @action setUser = (userData) => {
   return  this.user = {...this.user, ...userData}
  }

}
