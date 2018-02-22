import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import style from './styles/app.scss'

import Box from './components/Box'
import Wrapper from './components/Wrapper';
import Picture from './components/Picture';
import List from './components/List';
import Numbers from './components/Numbers';

let message = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed \
ullamcorper nibh, id efficitur eros. Suspendisse ultricies est ut mi \
volutpat, quis faucibus sem malesuada. Pellentesque pellentesque ex at \
posuere viverra. Nunc maximus massa nec lectus malesuada sodales. Lorem \
ipsum dolor sit amet, consectetur adipiscing elit. Cras eget malesuada \
tortor.';

let list = ["Asteroids", "Comets", "Moon", "Planets", "Stars", "Sun"];

let url = 'http://www.planwallpaper.com/static/images/desktop-year-of-the-tiger-images-wallpaper.jpg';

let date = (new Date).toString();
let random = parseInt(Math.random() * 100);

ReactDOM.render(
  <div>
    <Box
      boxClass = 'wrapper'
      header='I am the wrapper'
      message={message}
      // {/* <Box
      //   boxClass = 'numbers'
      //   header='Today Date and Random Number'
      //   date={date}
      //   random={random}
      // />
      // <Box
      //   boxClass = 'picture'
      //   header='Look at this Picture'
      //   url={url}
      //   <Box
      //     boxClass = 'list'
      //     header = 'Here Is a List'
      //     list={list}
      //   />
      // /> */}
    />

    <Wrapper
      header = 'I am the wrapper'
      message = {message}
      list = {list}
      url = {url}
      date = {date}
      random = {random}
    />
  </div>,
  document.getElementById('app')
);
