import React, { Component } from "react";
import { Image,Button, FlatList, StyleSheet, Text, View,TouchableNativeFeedback } from "react-native";
import { withNavigation } from 'react-navigation';

var REQUEST_URL ="http://news-at.zhihu.com/api/4/news/latest";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date:'',
      stories: [],
      topStories: [],
      loaded: false,
      errorMessage:''
    };
  }

  _keyExtractor = (item, index) => item.id;

  componentDidMount=()=> {
    this.fetchData();
  }

  fetchData=()=> {
    fetch(REQUEST_URL)
      .then(response => response.json())
      .then(responseData => {
        console.info(responseData);
        if(responseData.stories){
          this.setState({
            stories: this.state.stories.concat(responseData.stories),
            loaded: true,
          });
        }else if (responseData.error){
          this.setState({
            errorMessage:responseData.error.message,
          });
        }
        
      })
      .catch(error => {
        console.error(error);
      });
  }


  renderLoadingView=()=> {
    return (
      <View style={styles.loading}>
        <Text style={{fontSize:18}}>Loading...</Text>
      </View>
    );
  }

  // 无法 绑定 this 导致 无法 跳转 路由 直接 写在 FlatList中
  /* renderStory({item}) {
    return (
      <TouchableNativeFeedback key={{key:item.id}} style={styles.container} onPress={this._listener}>
        <View>
          <Image
            source={{ uri: item.images[0]}}
            style={styles.thumbnail}/>
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  } */

  render() {

    if(this.state.errorMessage!=''){
      console.info("error");
      return(
        <View style={styles.loading}>
          <Text style={{fontSize:18}}>{this.state.errorMessage}</Text>
        </View>
      );
    }

    console.info("view");
    return (
      <View>
        <FlatList
          style={styles.list}
          data={this.state.stories}//数据
          keyExtractor={this._keyExtractor}//key
          onRefresh={this.fetchData} //刷新触发
          refreshing={!this.state.loaded}//是否刷新中
          ListEmptyComponent={this.renderLoadingView}//是否为 空
          //数据渲染
          renderItem={({item}) => (

            <TouchableNativeFeedback key={{key:item.id}} onPress={ () =>
                    this.props.navigation.navigate('StoryItem', {
                    itemId: item.id,
                  })}>
              <View style={styles.container}>
                  <Image
                    source={{ uri: item.images[0]}}
                    style={styles.image}/>
                  <Text style={styles.title}>{item.title}</Text>
              </View>
            </TouchableNativeFeedback>

       )}
        />
      </View>
    );
  }

}

var styles = StyleSheet.create({
  loading:{
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  image: {
    margin:10,
    width: 100,
    height: 100
  },
  title: {
    flex:1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginRight:30,
    fontSize:18
  },
});