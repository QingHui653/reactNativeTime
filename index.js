/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import Main from './views/Main';
import Index from './views/Index';
import CameraDemo from './views/CameraDemo';
import {name as appName} from './app.json';

import Routers from './views/example/Routers';


AppRegistry.registerComponent(appName, () => CameraDemo);
