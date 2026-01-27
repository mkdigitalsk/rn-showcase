import "reflect-metadata";
import { initDI } from './src/app/di/diContainer';
import {AppRegistry} from 'react-native';
import App from './src/app/App';
import {name as appName} from './app.json';

initDI();
AppRegistry.registerComponent(appName, () => App);
