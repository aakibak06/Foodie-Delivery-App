import 'react-native-gesture-handler';

import { AppRegistry } from 'react-native';

import { name as appName } from './app.json';

import App from './App';
import { AppProvider } from './src/FoodDeliveryApp/UseContext';

const App2 = () => {
    return (
        <AppProvider>
            <App />
        </AppProvider>
    )
}







AppRegistry.registerComponent(appName, () => App2);
