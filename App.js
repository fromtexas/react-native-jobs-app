import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar, Alert} from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation';
import {Provider} from 'react-redux';
import {Notifications} from 'expo';
import store from './store';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReviewScreen from './screens/ReviewScreen';
import registerForNotifications from './services/push_notifications';


export default class App extends React.Component {
  componentDidMount () {
    registerForNotifications();
    Notifications.addListener((note)=>{
      const { data : {text}, origin} = note;
      if(origin === 'received' && text){
        Alert.alert(
          'New Push notification',
          text,
          [{text: 'Ok'}]
        )
      }
    })
  }
  render() {
    const MainNavigator = TabNavigator({
      welcome: {screen: WelcomeScreen},
      auth: {screen: AuthScreen},
      main: {
        screen: TabNavigator({
          map: {screen: MapScreen},
          deck: {screen: DeckScreen},
          review: {
            screen: StackNavigator({
              review: {screen: ReviewScreen},
              settings: {screen: SettingsScreen}
            })
          }
        },{
          tabBarPosition: 'bottom'
        })
      }
    },{
      navigationOptions: {
        tabBarVisible:  false
      },
      tabBarPosition: 'bottom',
      lazy: true,
    });
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator/>
        </View>
     </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
  },
});
