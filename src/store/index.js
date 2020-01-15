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

    this.scopes = new Scopes(this);
    this.users = new User(this);
  }
}

export default new Index();