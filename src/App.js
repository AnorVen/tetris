import React, {useState, useEffect} from 'react';
import connect from '@vkontakte/vk-connect';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';
import Tetris from "./tetris";
import Home from './panels/Home';
import Persik from './panels/Persik';
import './style.css';
import Player from "./components/Player";
import PropTypes from "prop-types";
import GamePleace from "./components/GamePleace";
const play1 = {
  name: 'name1',
  scores: 0,
  level: 1,
  tetris: 0,
  photo: 'https://magazeta.com/wp-content/uploads/2009/11/official.gif'
}
const play2 = {
  name: 'name2',
  scores: 0,
  level: 1,
  tetris: 0,
  photo: 'https://magazeta.com/wp-content/uploads/2009/11/official.gif'
}

const App = () => {
  const [activePanel, setActivePanel] = useState('home');
  const [fetchedUser, setUser] = useState(null);
  const [popout, setPopout] = useState(<ScreenSpinner size='large'/>);
  const [selectPlayers, select] = useState(true)

  useEffect(() => {
    connect.subscribe((
      {
        detail: {     type, data}
      }) => {
      if (type === 'VKWebAppUpdateConfig') {
        const schemeAttribute = document.createAttribute('scheme');
        schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
        document.body.attributes.setNamedItem(schemeAttribute);
      }
    });

    async function fetchData() {
      const user = await connect.sendPromise('VKWebAppGetUserInfo');
      setUser(user);
      setPopout(null);
    }

    fetchData();
  }, []);

  const go = e => {
    setActivePanel(e.currentTarget.dataset.to);
  };
  const playerOne = () => {
    select(true)
  };

  return (
    <div className="wrap">
      {
        selectPlayers ?
          <>
            <Player play={play2}/>
            <div className="gameWrap">
              <GamePleace/>
            </div>
          </>
          : <div className="chosePlayer">
            <button className="select1player" onClick={playerOne}>start</button>
          </div>
      }
    </div>
  )
};

export default App;

