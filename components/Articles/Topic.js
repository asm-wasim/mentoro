import React, { Component } from "react";
import { View, Text, StatusBar, TouchableOpacity, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import {Ionicons, FontAwesome, Feather} from "react-native-vector-icons";

class Topic extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#F1F7FF" }}>
        <StatusBar animated={true} backgroundColor="transparent" barStyle="dark-content" />
        <View style={{ backgroundColor: "white", borderBottomLeftRadius: 30, borderBottomRightRadius: 30, elevation: 250}}>
          <View style={{ marginHorizontal: 20, marginTop: 5, backgroundColor: "white",}}>
            <TouchableOpacity style={{ height: 30, marginTop: 5, marginBottom: 30, flexDirection: "row", }} onPress={() => this.props.navigation.goBack()}>
              <Ionicons name="chevron-back" size={24} />
            </TouchableOpacity>
            <Text style={{ marginTop: 8, position: "absolute", alignSelf: "center", fontFamily: "gilroy-bold", fontSize: 18, }}>Graph Theory</Text>
          </View>

          <View style={{ backgroundColor: "white", flexDirection: "row", justifyContent: 'space-around', marginBottom: 30}}>
            <View style={{ backgroundColor: "white", justifyContent: "center", marginLeft: "5%", }}>
              <Text style={{fontSize: 22,marginBottom: 5,fontFamily: "gilroy-bold",marginTop: 30,}}>Graph Theory</Text>
              <Text style={{fontSize: 16,fontFamily: "gilroy-medium",opacity: 0.4,}}>Learn graph theory with</Text>
              <Text style={{fontSize: 16,fontFamily: "gilroy-medium",opacity: 0.4,}}>Mentoro - easy</Text>
            </View>
            <View style={{backgroundColor: "white",marginRight: "5%",alignItems: "center",justifyContent: "center"}}>
              <Image
                style={{ height: 150, width: 150 }}
                source={require("../../assets/icon/warm-up.png")}
                resizeMode='cover'
              />
            </View>
          </View>
          <View style={{ flexDirection: "row", justifyContent: 'space-around', marginBottom: 30}}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <View style={{flexDirection: "row"}} >
                <View style={{height: 50, width: 50, backgroundColor: 'aliceblue', borderRadius: 12, alignItems: 'center', justifyContent: 'center'}} >
                  <Ionicons name="time-outline" size={24} color='dodgerblue' />
                </View>
                <View style={{marginLeft: 10, marginTop: 0, justifyContent: 'center'}} >
                  <Text style={{fontFamily: 'gilroy-bold'}} >54 mins</Text>
                  <Text style={{fontFamily: 'gilroy-medium'}} >Studying Time</Text>
                </View>
              </View>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <View style={{flexDirection: "row"}} >
                <View style={{height: 50, width: 50, backgroundColor: 'aliceblue', borderRadius: 12, alignItems: 'center', justifyContent: 'center'}} >
                  <Ionicons name="people" size={24} color='dodgerblue' />
                </View>
                <View style={{marginLeft: 10, marginTop: 0, justifyContent: 'center'}} >
                  <Text style={{fontFamily: 'gilroy-bold'}} >2434</Text>
                  <Text style={{fontFamily: 'gilroy-medium'}} >Students</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <ScrollView style={{ flex: 0.6, backgroundColor: "#F1F7FF" }}>
          <Text></Text>
          <Text></Text>
          <Text></Text>
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
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
        </ScrollView>
      </View>
    );
  }
}

export default Topic;
