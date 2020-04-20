/** @jsx jsx */

import { Menu } from 'antd';
import { css, jsx } from '@emotion/core';
import { navigate } from '@reach/router';
import { useState, Fragment } from 'react';
import { ClickParam } from 'antd/lib/menu';

type MenuProps = {
  location: Location;
};

const AppMenu = ({ location }: MenuProps) => {
  const [current, setCurrent] = useState('machines');

  const clickHandler = (e: ClickParam) => {
    setCurrent(e.key);
    navigate(`/${e.key}`);
  };

  console.log('currenttttt', current);
  return (
    <Fragment>
      <Menu
        onClick={clickHandler}
        selectedKeys={[location.pathname.split('/')[1]]}
        mode="horizontal"
        className="container"
        css={css`
          border-bottom: none;
        `}
      >
        <Menu.Item key="machines">Machines</Menu.Item>
        <Menu.Item key="processes">Processes</Menu.Item>
      </Menu>
      <div
        css={css`
          border-top: 1px solid #f0f0f0;
        `}
      ></div>
    </Fragment>
  );
};

export default AppMenu;
