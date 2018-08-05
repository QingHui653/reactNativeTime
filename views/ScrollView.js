import React, { Component } from 'react';
import { ScrollView, Image, Text } from 'react-native';

export default class IScrolledDownAndWhatHappenedNextShockedMe extends Component {
  render() {
      return (
        <ScrollView style={{flex:1}}>
          <Text style={{fontSize:20}}>Scroll me plz</Text>
          <Image style={{width: 440, height: 200}} source={require('./img/favicon.png')} />
          <Image style={{width: 440, height: 200}} source={require('./img/favicon.png')} />
          <Image style={{width: 440, height: 200}} source={require('./img/favicon.png')} />
          <Image style={{width: 440, height: 200}} source={require('./img/favicon.png')} />
          <Image style={{width: 440, height: 200}} source={require('./img/favicon.png')} />
          <Text style={{fontSize:20}}>If you like</Text>
          <Image style={{width: 440, height: 200}} source={require('./img/favicon.png')} />
          <Image style={{width: 440, height: 200}} source={require('./img/favicon.png')} />
          <Image style={{width: 440, height: 200}} source={require('./img/favicon.png')} />
          <Image style={{width: 440, height: 200}} source={require('./img/favicon.png')} />
          <Image style={{width: 440, height: 200}} source={require('./img/favicon.png')} />
          <Text style={{fontSize:20}}>Scrolling down</Text>
          <Image style={{width: 440, height: 200}} source={require('./img/favicon.png')} />
          <Image style={{width: 440, height: 200}} source={require('./img/favicon.png')} />
          <Image style={{width: 440, height: 200}} source={require('./img/favicon.png')} />
          <Image style={{width: 440, height: 200}} source={require('./img/favicon.png')} />
          <Image style={{width: 440, height: 200}} source={require('./img/favicon.png')} />
          <Text style={{fontSize:20}}>What's the best</Text>
          <Image style={{width: 440, height: 200}} source={require('./img/favicon.png')} />
          <Image style={{width: 440, height: 200}} source={require('./img/favicon.png')} />
          <Image style={{width: 440, height: 200}} source={require('./img/favicon.png')} />
          <Image style={{width: 440, height: 200}} source={require('./img/favicon.png')} />
          <Image style={{width: 440, height: 200}} source={require('./img/favicon.png')} />
          <Text style={{fontSize:20}}>Framework around?</Text>
          <Image style={{width: 440, height: 200}} source={require('./img/favicon.png')} />
          <Image style={{width: 440, height: 200}} source={require('./img/favicon.png')} />
          <Image style={{width: 440, height: 200}} source={require('./img/favicon.png')} />
          <Image style={{width: 440, height: 200}} source={require('./img/favicon.png')} />
          <Image style={{width: 440, height: 200}} source={require('./img/favicon.png')} />
          <Text style={{fontSize:30}}>React Native</Text>
        </ScrollView>
    );
  }
}