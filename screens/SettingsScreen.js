import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements'
import {connect} from 'react-redux';
import {clearLikedjobs} from '../actions/job_actions';

class SettingsScreen extends Component {
  render () {
    return (
      <View>
        <Button large onPress={() => this.props.dispatch(clearLikedjobs())} icon={{name: 'delete-forever'}} title = 'Reset Liked Jobs'/>
      </View>
    );
  }
}

export default connect()(SettingsScreen);
