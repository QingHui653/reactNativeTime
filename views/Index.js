import React from 'react';
import { createStackNavigator } from 'react-navigation';

import MainSceen from './Main'
import StoryItem from './StoryItem'


  
const RootStack = createStackNavigator(
    {
      Main: MainSceen,
      StoryItem: StoryItem,
    },
    {
      initialRouteName: 'Main',
    }
);
  
export default class Index extends React.Component {
    render() {
      return <RootStack />;
    }
}