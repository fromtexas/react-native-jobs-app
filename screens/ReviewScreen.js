import React, {Component} from 'react';
import {ScrollView, Text, View, Linking, Platform} from 'react-native';
import {Button,Card} from 'react-native-elements';
import {connect} from 'react-redux';
import {MapView} from 'expo';

class ReviewScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Review Jobs',
      headerRight: (
        <Button
          title='Settings'
          backgroundColor='rgba(0,0,0,0)'
          color = 'rgba(0,122,255,1)'
          onPress={() => navigation.navigate('settings')} />)
    }
  };

  renderLikedJobs () {
    return this.props.likedJobs.map(job => {
      const initialRegion = {
        longitude: job.longitude,
        latitude: job.latitude,
        latitudeDelta: 0.045,
        longitudeDelta: 0.02
      };
      return (
        <Card title={job.jobtitle} key={job.jobkey}>
          <View style={{height: 200}}>
            <MapView
              scrollEnabled = {false}
              style = {{flex:1}}
              cacheEnabled = {Platform.OS === 'android'}
              initialRegion = {
                initialRegion
              }
            />
            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>{job.company}</Text>
              <Text style={styles.italics}>{job.formattedRelativeTime}</Text>
            </View>
            <Button onPress={() => Linking.openURL(job.url)} backgroundColor='#03a9f4' title='Apply Now!' />
          </View>
        </Card>
      );
    })
  }

  render () {
    return (
      <ScrollView>
        {this.renderLikedJobs()}
      </ScrollView>
    );
  }
}

const styles = {
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    marginTop: 10
  },
  italics: {
    fontStyle: 'italic'
  }
}

const mapStateToProps = ({likedJobs}) => ({
  likedJobs
});

export default connect(mapStateToProps)(ReviewScreen);
