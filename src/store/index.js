import { observable, action, computed} from 'mobx'
import Scopes from "./Scopes";
import User from "./User";

import * as products from '~/api/products';
import * as cart from '~/api/cart';

class Index{
  constructor(){
    this.api = {
      products,
      cart
    }

    this.storage = window.localStorage;

    this.scopesPlayer1 = new Scopes(this);
    this.scopesPlayer2 = new Scopes(this);
    this.user1 = new User(this);
    this.user2 = new User(this);
    this.user1.setScopes(this.scopesPlayer1);
    this.user2.setScopes(this.scopesPlayer2);
  }
}

export default new Index();