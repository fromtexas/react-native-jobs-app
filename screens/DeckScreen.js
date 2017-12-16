import React, {Component} from 'react';
import {View, Text, Platform} from 'react-native';
import {connect} from 'react-redux';
import Swipe from '../components/Swipe';
import {MapView} from 'expo';
import {Card, Button} from 'react-native-elements';
import {likeJob} from '../actions/job_actions';

class DeckScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'deck'
  };

  renderCard (job) {

    const initialRegion = {
      longitude: job.longitude,
      latitude: job.latitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.02
    };

    return (
      <Card key={job.jobkey} title = {job.jobtitle}>
        <View style = {{height: 300}}>
          <MapView
            scrollEnabled = {false}
            style = {{flex:1}}
            cacheEnabled = {Platform.OS === 'android'}
            initialRegion = {
              initialRegion
            }
          />
        </View>
        <View style={styles.detailWrapper}>
          <Text>
            {job.company}
          </Text>
          <Text>
            {job.formattedRelativeTime}
          </Text>
        </View>
        <Text>
          {job.snippet.replace(/<b>/g, '').replace(/<\/b>/g, '')}
        </Text>
      </Card>
    );
  }

  renderNoMoreCards = () => {
    return (
      <Card title='No More Jobs'>
        <Button
           backgroundColor='#03a9f4'
           icon={{name: 'my-location'}}
           large title='Back To Map'
           onPress={() => this.props.navigation.navigate('map')}
         />
      </Card>
    );
  }

  render () {
    return (
      <View style={{marginTop: 10}}>
        <Swipe
          data = {this.props.jobs}
          renderCard = {this.renderCard}
          renderNoMoreCards = {this.renderNoMoreCards}
          keyProp = 'jobkey'
          onSwipeRight = { job => this.props.dispatch(likeJob(job))}
        />
      </View>
    );
  }
}

const styles = {
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  }
};

const mapStateToProps = ({jobs}) => (
  {jobs}
);

export default connect(mapStateToProps)(DeckScreen);
