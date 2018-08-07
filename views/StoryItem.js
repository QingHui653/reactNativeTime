import React, { Component } from "react";
import { Image, Button, FlatList, StyleSheet, Text, View,WebView } from "react-native";
import { withNavigation } from 'react-navigation';

const STORY_URL ="http://news-at.zhihu.com/api/4/news/";

export default class StoryItem extends Component {

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
    this.fetchStory( this.props.navigation.getParam('itemId', 'NO-ID'));
  }

  fetchStory=(id)=> {
    if(this.state.body==''){
      fetch(STORY_URL+id)
        .then(response => response.json())
        .then(responseData => {
          // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
          console.info(responseData);
          this.setState({
            body:responseData.body,
            image:responseData.image,
            css:this.state.css.concat(responseData.css),
            loaded: true,
            id:id
          });
          if(this.state.css){
            <link href=''/>
            var cssHtml ="<link rel='stylesheet' type='text/css' href='"+this.state.css[0]+"'/>"
            this.setState({
              body:this.state.body+cssHtml
            });
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  renderLoadingView=()=> {
    return (
      <View>
        <Text>Loading movies...</Text>
      </View>
    );
  }

  render() {

    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <View style={{ flex: 1}}>
          <WebView source = {{ html: this.state.body }} scalesPageToFit={true}/>
      </View>
    );
  }

}