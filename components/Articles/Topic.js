import React, { Component } from "react";
import { View, Text, StatusBar, TouchableOpacity, Image } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";

class Topic extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#F1F7FF" }}>
        <StatusBar
          animated={true}
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <View
          style={{
            flex: 0.5,
            backgroundColor: "white",
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}
        >
          <View
            style={{
              marginHorizontal: 20,
              marginTop: 5,
              backgroundColor: "white",
            }}
          >
            <TouchableOpacity
              style={{
                height: 30,
                marginTop: 5,
                marginBottom: 30,
                flexDirection: "row",
              }}
              onPress={() => this.props.navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={24} />
            </TouchableOpacity>
            <Text
              style={{
                marginTop: 8,
                position: "absolute",
                alignSelf: "center",
                fontFamily: "gilroy-bold",
                fontSize: 18,
              }}
            >
              Graph Theory
            </Text>
          </View>

          <View
            style={{
              flex: 0.6,
              backgroundColor: "white",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flex: 0.5,
                backgroundColor: "white",
                justifyContent: "flex-end",
                marginLeft: "5%",
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  marginBottom: 15,
                  fontFamily: "gilroy-bold",
                }}
              >
                Graph Theory
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "gilroy-medium",
                  opacity: 0.4,
                }}
              >
                Learn graph theory with Mentoro - easy
              </Text>
            </View>
            <View
              style={{
                flex: 0.5,
                backgroundColor: "white",
                marginRight: "5%",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Image
                style={{ height: "80%", width: "80%" }}
                source={require("../../assets/icon/warm-up.png")}
              />
            </View>
          </View>
          <View
            style={{
              flex: 0.4,
              backgroundColor: "orange",
              flexDirection: "row",
            }}
          >
            <View style={{ flex: 0.5, backgroundColor: "green" }}>
              <Ionicons name="time-outline" size={30} />
            </View>
            <View style={{ flex: 0.5, backgroundColor: "yellow" }}></View>
          </View>
        </View>
        <View style={{ flex: 0.6, backgroundColor: "#F1F7FF" }}>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
        </View>
      </View>
    );
  }
}

export default Topic;
