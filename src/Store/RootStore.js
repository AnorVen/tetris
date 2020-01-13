import { observable, action, computed} from 'mobx'
import Scopes from "./Scopes";
import User from "./User";

import * as products from '~/api/products';
import * as cart from '~/api/cart';

class RootStore{
  constructor(){
    this.api = {
      products,
      cart
    }

    this.storage = window.localStorage;

    this.cart = new Scopes(this);
    this.products = new User(this);
  }
}

export default new RootStore();