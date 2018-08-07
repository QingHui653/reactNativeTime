import React, { Component } from "react";
import { Image, Button, FlatList, StyleSheet, Text, View,WebView } from "react-native";
import { withNavigation } from 'react-navigation';

const STORY_URL ="http://news-at.zhihu.com/api/4/news/";

class StoryItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id:'',
      title:'',
      image:'',
      css:[],
      body:'',
      loaded: false,
    };
  }

  componentDidMount() {
  }

  fetchStory=(id)=> {
    fetch(STORY_URL+id)
      .then(response => response.json())
      .then(responseData => {
        // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
        console.info(responseData);
        this.setState({
          body:responseData.getParam,
          loaded: true,
          id:id
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  renderLoadingView=()=> {
    return (
      <View>
        <Text>Loading movies...</Text>
      </View>
    );
  }

  render() {
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    this.fetchStory(itemId);

    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <WebView
              source={{body: this.state.body}}
          />
      </View>
    );
  }

}

export default withNavigation(StoryItem);