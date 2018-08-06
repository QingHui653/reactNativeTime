/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import Main from './views/Main';
import Routers from './views/Routers';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Main);
