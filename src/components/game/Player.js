import React from 'react';
import PropTypes from 'prop-types';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import withStore from "../../hocs/withStore";

const Player = (props) => {
  console.log(props.stores)
  const fetchedUser = props.stores.users.user1;
  console.log(fetchedUser)
  return (
    <div className="player">
      <div>
        {fetchedUser &&
        <Group title="User Data Fetched with VK Connect">
          <Cell
            before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
            description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
          >
            {`${fetchedUser.first_name} ${fetchedUser.last_name}`}
          </Cell>
        </Group>}
      </div>
      <ul id="status">
        <li>Счет: <span data-role="scope">{fetchedUser.scope}</span></li>
        <li>Уровень: <span data-role="level">{fetchedUser.level}</span></li>
        <li>Тетрисов: <span data-role="tetris">{fetchedUser.tetris}</span></li>
      </ul>
    </div>
  );
};

export default withStore(Player);