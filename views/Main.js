import React, { Component } from "react";

import { Image, FlatList, StyleSheet, Text, View } from "react-native";

import StoryList from "StoryList"

export default class Main extends Component {
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

  render() {
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
  }

}
