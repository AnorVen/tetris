import React, {Component} from 'react';
import connect from '@vkontakte/vk-connect';
import '@vkontakte/vkui/dist/vkui.css';
import './style.css';
import PropTypes from "prop-types";
import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/database'
import RootStore from "./store";
import withStore from './hocs/withStore'
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import { routes, routesMap, urlBuilder} from './router'

const firebaseConfig = {
  apiKey: "AIzaSyD3KQVXLX2kMb5fuK5hG8MTCkDMuWagCgY",
  authDomain: "tetr-e831c.firebaseapp.com",
  databaseURL: "https://tetr-e831c.firebaseio.com",
  projectId: "tetr-e831c",
  storageBucket: "tetr-e831c.appspot.com",
  messagingSenderId: "20223957795",
  appId: "1:20223957795:web:76229799fd1a3646d90a96"
};

class App extends Component {
  componentDidMount() {
    firebase.initializeApp(firebaseConfig);
    connect.subscribe((event) => {
      switch (event.detail.type) {
        case 'VKWebAppUpdateConfig' :
          const schemeAttribute = document.createAttribute('scheme');
          schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
          document.body.attributes.setNamedItem(schemeAttribute);
          break;

        case 'VKWebAppAccessTokenFailed':
          console.log('event Fal', event);
          break;
        case 'VKWebAppAccessTokenReceived':
          console.log('token', event);
          break;
        case 'VKWebAppGetUserInfoResult':
          console.log('info', event);
          this.props.stores.users.setUser1(event.detail.data)
          break;
        case 'VKWebAppAllowNotificationsResult':
          console.log('Noti', event);
          break;
        default:
          console.log('def', event)
      }
    })
    connect.send("VKWebAppGetUserInfo", {});
    connect.send("VKWebAppGetAuthToken",
      {
        "app_id": 7283256,
        "scope": "friends"
      })
    connect.send("VKWebAppAllowNotifications", {});
  }

  routesItems = routes.map((route) => {
    return <Route
      key={route.path}
      path={route.path}
      component={route.component}
      exact={route.exact}
    />
  });


  render() {
    return (
      <BrowserRouter>
      <div className="wrap">
        <nav>
            <ul className="list-group">
              <li className="list-group-item">
                <NavLink to={routesMap.home}
                         exact={true}
                         activeClassName
                >Home</NavLink>
              </li>
              <li className="list-group-item">
                <NavLink to={routesMap.game}
                         exact={true}
                         activeClassName>
                  Game
                </NavLink>
              </li>
              <li className="list-group-item">
                <NavLink to={routesMap.result}
                         exact={true}
                         activeClassName>
                 Таблица рекордов
                </NavLink>
              </li>
            </ul>
        </nav>
          <Switch>
            {this.routesItems}
          </Switch>
      </div>
      </BrowserRouter>
    )
  }
};

export default withStore(App);
