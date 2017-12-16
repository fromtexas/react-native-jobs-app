import React, {Component} from 'react';
import {View,Text,ScrollView,Dimensions, Button} from 'react-native';
//import {Button} from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class Slides extends Component {
  checkIndex (index, length) {
    if( index === length ) {
      return <Button onPress={this.props.onComplete} style={styles.button}  title='Go'/> ;
    }
  }
  renderSlides () {
    const {data} = this.props;
    return data.map((item, index) => (
      <View style={[styles.slide, {backgroundColor: item.color}]} key={index}>
        <Text style={styles.slideText}>{item.text}</Text>
        {this.checkIndex(index, data.length-1)}
      </View>))
  }
  render () {
    return (
      <ScrollView
        pagingEnabled
        horizontal
        style={{flex: 1}}
        >
        {this.renderSlides()}
      </ScrollView>
    );
  }
}

const styles = {
  slide: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
  },
  slideText: {
    fontSize: 30,
    textAlign: 'center',
    color: '#fff'
  },
  button: {
    backgroundColor: '#0288d1',
    marginTop: 20
  }
};
