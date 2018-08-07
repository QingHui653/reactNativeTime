import React from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';

//需要将参数包装成一个对象，作为navigation.navigate方法的第二个参数传递给路由。如： this.props.navigation.navigate('RouteName', { /* params go here */ })
// 读取页面组件中的参数的方法：this.props.navigation.state.params。
/**navigate接受可选的第二个参数，以便将参数传递给要导航到的路由。 例如：this.props.navigation.navigate('RouteName', {paramName: 'value'})。
我们可以使用this.props.navigation.getParam读取参数
作为getParam的替代方法，可以使用this.props.navigation.state.params。 如果未指定参数，则为null。 */
  class HomeScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={()=> {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate('Details', {
              itemId: 86,
              otherParam: 'anything you want here',
            });
          }}
        />
      </View>
      );
    }
  }

  class DetailsScreen extends React.Component {
    render() {
        /* 2. Get the param, provide a fallback value if not available */
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID');
        const otherParam = navigation.getParam('otherParam', 'some default value');
    
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen</Text>
            <Text>itemId: {JSON.stringify(itemId)}</Text>
            <Text>otherParam: {JSON.stringify(otherParam)}</Text>
            <Button
              title="Go to Details... again"
              onPress={() =>
                this.props.navigation.push('Details', {
                  itemId: Math.floor(Math.random() * 100),
                })}
            />
            <Button
              title="Go to Home"
              onPress={() => this.props.navigation.navigate('Home')}
            />
            <Button
              title="Go back"
              onPress={() => this.props.navigation.goBack()}
            />
          </View>
        );
      }
  }
  
  const RootStack = createStackNavigator(
    {
      Home: HomeScreen,
      Details: DetailsScreen,
    },
    {
      initialRouteName: 'Home',
    }
  );
  
  export default class App extends React.Component {
    render() {
      return <RootStack />;
    }
  }