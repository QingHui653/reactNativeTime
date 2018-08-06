import React, { Component } from "react";

import { Image, FlatList, StyleSheet, Text, View } from "react-native";

import StoryList from "StoryList"

export default class StoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  _keyExtractor = (item, index) => item.id;

  renderStory=({item})=>{
      return( 
        <StoryItem 
            key={} 
            onSelect={() => this.selectStory(story)}
        />
    )
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
        <View>
            <View>
                <Text></Text>
            </View>
            <FlatList
                ref="listview"
                data={this.state.data}
                renderItem={this.renderStory}
                keyExtractor={this._keyExtractor}
                style={styles.list}
            />
        </View>
    );
  }

}