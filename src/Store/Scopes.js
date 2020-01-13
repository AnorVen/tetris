import {action, computed, observable, runInAction} from 'mobx';

export default class Scopes {
  constructor(rootStore){
    this.rootStore = rootStore;
    this.api = this.rootStore.api.cart;
    this.token = this.rootStore.storage.getItem('cartToken');
  }

  @observable scopes = 0;

  @observable tetris = 0;

  @computed level = 1 + this.scopes % 3;

  @action addScopes = (scope) => {
    this.scopes += scope
  }

  @action addTetris = (tetris) => {
    this.tetris += tetris;
    this.addScopes(4)
  }
}
