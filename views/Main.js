import React, { Component } from "react";
import { Image,Button, FlatList, StyleSheet, Text, View,TouchableNativeFeedback } from "react-native";
import { withNavigation } from 'react-navigation';
import moment from 'moment'

var LAST_URL ="http://news-at.zhihu.com/api/4/news/latest";
var BEFORE_URL ="http://news.at.zhihu.com/api/4/news/before/";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date:'',
      beforeDate:'',
      stories: [],
      LastStory:[],
      beforeStory:[],
      topStories: [],
      loaded: false,
      errorMessage:''
    };
  }

  _keyExtractor = (item, index) => item.id;

  componentDidMount=()=> {
    this.fetchData('last');
  }

  fetchData=(type)=>{
    var url =LAST_URL;
    if(type=='before'){
        var date = moment().subtract(1,'days').format('YYYYMMDD')
        if(this.state.date!=''){
            date = moment(this.state.date,'YYYYMMDD').subtract(1,'days').format('YYYYMMDD')
        }
        url =BEFORE_URL+date; 
    }
    console.info(url);
    fetch(url)
        .then(response => response.json())
        .then(responseData => {
            if(responseData.stories){
                if(type=='last'){
                    this.setState({
                      LastStory: responseData.stories,
                      loaded: true,
                    });
                }else{
                    this.setState({
                      date: responseData.date,
                      loaded: true,
                      beforeStory: this.state.beforeStory.concat(responseData.stories),
                    });
                }

                this.setState({
                  stories: this.state.LastStory.concat(this.state.beforeStory),
                });
            }else if (responseData.error) {
                this.setState({
                  errorMessage:responseData.error.message,
                });
            }
        })
  }

  fetchLast=()=> {
    this.fetchData('last');
  }

  fetchBefore=()=>{
    this.fetchData('before');
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
          onRefresh={this.fetchLast} //刷新触发
          onEndReachedThreshold={0.5}
          onEndReached={this.fetchBefore} 
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