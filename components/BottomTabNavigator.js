/* This is a class that creates a bottom tab navigator with two screens, Transaction and Search, using
React Navigation in a React Native app. */
import React, { Component } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import TransactionScreen from "../screens/Transaction";
import SearchScreen from "../screens/Search";

/* `const Tab = createBottomTabNavigator();` is creating a new instance of the bottom tab navigator
using the `createBottomTabNavigator` function from the `@react-navigation/bottom-tabs` library. This
instance is then used to define the screens and options for the bottom tab navigator. */
const Tab = createBottomTabNavigator();

export default class BottomTabNavigator extends Component {
  render() {
    return (
      <NavigationContainer>
       {/* The `Tab.Navigator` component is creating a bottom tab navigator with two screens,
       Transaction and Search, using React Navigation in a React Native app. The `screenOptions`
       prop is used to define the options for each screen in the navigator, including the icon
       displayed in the tab bar. The `tabBarOptions` prop is used to define the options for the tab
       bar itself, including the active and inactive colors, height, label style, and tab style. The
       `Tab.Screen` components define the screens that will be displayed in the navigator, with the
       `name` prop specifying the name of the screen and the `component` prop specifying the
       component to be rendered for that screen. */}
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Transaction") {
                iconName = "book";
              } else if (route.name === "Search") {
                iconName = "search";
              }

              // You can return any component that you like here!
              return (
                <Ionicons
                  name={iconName}
                  size={size}
                  color={color}
                />
              );
            }
          })}
          tabBarOptions={{
            activeTintColor: "#FFFFFF",
            inactiveTintColor: "black",
            style: {
              height: 130,
              borderTopWidth: 0,
              backgroundColor: "#5653d4"
            },
            labelStyle: {
              fontSize: 20,
              fontFamily: "Rajdhani_600SemiBold"
            },
            labelPosition: "beside-icon",
            tabStyle: {
              marginTop: 25,
              marginLeft: 10,
              marginRight: 10,
              borderRadius: 30,
              borderWidth: 2,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#5653d4"
            }
          }}
        >
          <Tab.Screen name="Transaction" component={TransactionScreen} />
          <Tab.Screen name="Search" component={SearchScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
