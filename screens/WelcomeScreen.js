import React, {Component} from 'react';
import _ from 'lodash';
import {View, Text, Button, AsyncStorage} from 'react-native';
import Slides from '../components/Slides';
import { AppLoading } from 'expo';

const SLIDE_DATA = [
  {text: 'Welcome to JobApp', color:'#03A9F4'},
  {text: 'Set your location then swipe away', color: '#009688'}
];
export default class WelcomeScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'welcome'
  };

   async componentWillMount () {
     let token = await AsyncStorage.getItem('fb_token');
     if(token) {
       this.props.navigation.navigate('map');
     } else {
       this.setState({token: false});
     }
  }

  state = { token: null }

  onSlidesComplete = () => {
    this.props.navigation.navigate('auth');
  }

  render () {
    if(_.isNull(this.state.token)) {
      return <AppLoading />;
    }
    return (
      <Slides onComplete={this.onSlidesComplete} data = {SLIDE_DATA}/>
    );
  }
}
