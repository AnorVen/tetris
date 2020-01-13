import React, {Component} from 'react';
import connect from '@vkontakte/vk-connect';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';
import './style.css';
import Player from "./components/Player";
import PropTypes from "prop-types";
import GamePleace from "./components/GamePleace";
import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/database'
import RootStore from "./Store/RootStore";

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
  state = {
    activePanel: 'home',
    fetchedUser: null,
    popout: <ScreenSpinner size='large'/>,
    selectPlayers: true,
  }

  setActivePanel = (active) => {
    this.setState({
      activePanel: active
    })
  }

  setUser = (user) => {
    console.log(user)
    this.setState({
      user: user
    })
  }

  setPopout = (popout) => {
    this.setState({
      popout
    })
  }

  select = (sel) => {
    this.setState({
      selectPlayers: sel
    })
  }

  componentDidMount() {
    firebase.initializeApp(firebaseConfig);
    connect.send("VKWebAppGetUserInfo", {});
    // User.setUser1(play1)
    connect.send("VKWebAppGetAuthToken",
      {
        "app_id": 7257666, // - tet
        // 7254806, // - tetris
        "scope": ""
      });



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
          this.setUser(event.detail.data);
          break;
        default:
          console.log('def', event)
      }
    })

    /*
        this.fetchData().then(r => {
          console.log(222, r)
          this.setUser(r);
          this.setPopout(null);
        });*/
  }


  fetchData = async () => {
    const init = connect.send("VKWebAppInit");
    const user = await connect.sendPromise('VKWebAppGetUserInfo');
    return user

    /*    {
    "type": "VKWebAppAllowNotificationsResult",
    "data": {
    "result": true
    }
    }*/

  }

  selectPlayers = (val) => {
    this.select(true)
    User.selectPlayersVal(val)
  };
  user1 = {
    name: '',
    photo: '',
    scope: 0,
    tetris: 0,
    level: 1,
    isPlay: false
  };
  render() {
    return (
      <div className="wrap">
        {
          this.state.selectPlayers ?
            <>
              <Player play={this.state.user}/>
              <div className="gameWrap">
                <GamePleace/>
              </div>
            </>
            : <div className="chosePlayer">
              <button className="select1player" onClick={() => this.selectPlayers(1)}>start 1 player
              </button>
              <button className="select1player" onClick={() => this.selectPlayers(2)}>start 2 player
              </button>
            </div>
        }
      </div>
    )
  }
};

export default App;
