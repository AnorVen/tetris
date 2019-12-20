import React, {useState, useEffect} from 'react';
import connect from '@vkontakte/vk-connect';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';
import Tetris from "./tetris";
import Home from './panels/Home';
import Persik from './panels/Persik';

const App = () => {
  const [activePanel, setActivePanel] = useState('home');
  const [fetchedUser, setUser] = useState(null);
  const [popout, setPopout] = useState(<ScreenSpinner size='large'/>);
  const [selectPlayers, select] = useState(false)

  useEffect(() => {
    connect.subscribe(({detail: {type, data}}) => {
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
    document.querySelector('.canvas1').style.display = 'block'
    const tetris = new Tetris(
      'canvas1',
      'wasd');
    tetris.start();
  };

  const playerTwo = () => {
    select(true)
    document.querySelector('.canvas1').style.display = 'block'
    document.querySelector('.canvas2').style.display = 'block'
    const tetris1 = new Tetris(
      'canvas1',
      'wasd');
    const tetris2 = new Tetris(
      'canvas2',
      'arrow')

    tetris1.start();
    tetris2.start()
  }

  return (
  	<section className="content">
      <div className="wrap">
        <div className="player player1">
          <div className="photo">
            <img src="" alt="">
              <p className="name"></p>
          </div>
          <ul id="status1">
            <li>Счет: <span data-role="scope">0</span></li>
            <li>Уровень: <span data-role="level">1</span></li>
            <li>Тетрисов: <span data-role="tetris">0</span></li>
          </ul>
        </div>
        <div className="gameWrap">
          <div className="chosePlayer" style="display: ${selectPlayers ? 'none' : 'block'}">
            <button className="select1player" onClick={playerOne}>1</button>
            <button className="select2player" onClick={playerTwo}>2</button>
          </div>
          <div className="canvas1">
            <canvas id="canvas1">Ваш браузер не поддерживает canvas.</canvas>
          </div>
          <div className="canvas2">
            <canvas id="canvas2">Ваш браузер не поддерживает canvas.</canvas>
          </div>
        </div>

        <div className="player player2">
          <div className="photo">
            <img src="" alt="">
              <p className="name"></p>
          </div>
          <ul id="status2">
            <li>Счет: <span data-role="scope">0</span></li>
            <li>Уровень: <span data-role="level">1</span></li>
            <li>Тетрисов: <span data-role="tetris">0</span></li>
          </ul>
        </div>
      </div>
    </section>
);}

export default App;

