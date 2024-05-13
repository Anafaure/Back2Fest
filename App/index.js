import { AppRegistry } from 'react-native';
import App from './App'; // Make sure this path is correct
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
