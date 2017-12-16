import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, Button, AsyncStorage} from 'react-native';
import {facebookLogin} from '../actions/auth_actions';

class AuthScreen extends Component {

  static navigationOptions = {
    tabBarLabel: 'auth'
  };

  componentDidMount () {
    this.props.dispatch(facebookLogin());
    this.onAuthComplete(this.props);
    //AsyncStorage.removeItem('fb_token');
  }

  componentWillReceiveProps (nextProps) {
    this.onAuthComplete(nextProps);
  }

  onAuthComplete (props) {
    if (props.auth) {
      this.props.navigation.navigate('map');
    }
  }

  render () {
    return (
      <View>
        <Text>AuthScreen!</Text>
          <Button
          onPress={() => this.props.navigation.goBack()}
          title="Go back home"
        />
      </View>
    );
  }
}

const mapStateToProps = ({auth}) => ({
  auth
});

export default connect(mapStateToProps)(AuthScreen);
