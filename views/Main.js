import React, { Component } from "react";

import { Image, FlatList, StyleSheet, Text, View,TouchableOpacity,TouchableNativeFeedback } from "react-native";

// import StoryList from "StoryList"

var REQUEST_URL ="http://news-at.zhihu.com/api/4/news/latest";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date:'',
      stories: [],
      topStories: [],
      loaded: false
    };
    this.fetchData = this.fetchData.bind(this);
  }

  _keyExtractor = (item, index) => item.id;

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then(response => response.json())
      .then(responseData => {
        // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
        this.setState({
          stories: this.state.stories.concat(responseData.stories),
          loaded: true
        });
      })
      .catch(error => {
        console.error(error);
      });
  }


  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  selectStory=(story)=>{
    story.read = true;
    this.props.navigator.push({
      title: story.title,
      name: 'story',
      story: story,
    });
  }

  renderMovie({ item }) {
    // { item }是一种“解构”写法，请阅读ES2015语法的相关文档
    // item也是FlatList中固定的参数名，请阅读FlatList的相关文档
    return (
      <TouchableNativeFeedback key={{key:item.id}} style={styles.container} onPress={(e) => {this.selectStory(item.id,this)}}>
        <View>
          <Image
            source={{ uri: item.images[0]}}
            style={styles.thumbnail}/>
          <View style={styles.rightContainer}>
            <Text onPress={this._onPressButton} style={styles.title}>{item.title}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View>
        <FlatList
          data={this.state.stories}
          renderItem={this.renderMovie}
          keyExtractor={this._keyExtractor}
          style={styles.list}
        />
      </View>
    );
  }

  /* render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View>
        <FlatList>
          <StoryList></StoryList>
        </FlatList>
      </View>
    );
  } */

}


var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  rightContainer: {
    flex: 1
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: "center"
  },
  year: {
    textAlign: "center"
  },
  thumbnail: {
    width: 53,
    height: 81
  },
  list: {
    paddingTop: 20,
    backgroundColor: "#F5FCFF"
  }
});