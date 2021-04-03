import React, { Component } from "react";
import { View, Text, StatusBar, TouchableOpacity, Image, FlatList } from "react-native";

import { Ionicons } from 'react-native-vector-icons'

let posts = [
  {
    id: "1",
    title: "Nayem",
    description: 'Earned on Dec 23, 2021',
    icon: require('../../assets/Person/nayem.jpg'),
  },
  {
    id: "2",
    title: "Hridoy",
    description: 'Earned on Feb 25, 2020',
    icon: require("../../assets/Person/hridoy.jpg"),
  },
];

let badgesToEarn = [
  {
    id: "1",
    title: "Nayem",
    description: 'Earned on Jan 1, 2021',
    icon: require('../../assets/Person/nayem.jpg'),
  },
  {
    id: "2",
    title: "Hridoy",
    description: 'Earned on Feb 25, 2020',
    icon: require("../../assets/Person/hridoy.jpg"),
  },
  {
    id: "3",
    title: "Wasim",
    description: 'Earned on Dec 23, 2021',
    icon: require("../../assets/Person/wasim.jpg"),
  },
  {
    id: "4",
    title: "Mujammal",
    description: 'Earned on Sep 08, 2019',
    icon: require("../../assets/Person/mujammal.jpg"),
  },
  {
    id: "5",
    title: "Kamonasish",
    description: 'Earned on Jan 1, 2021',
    icon: require("../../assets/Person/kamona.jpg"),
  },
  {
    id: "6",
    title: "Shakib",
    description: 'Earned on Dec 23, 2021',
    icon: require("../../assets/Person/shakib.jpg"),
  },
  {
    id: "7",
    title: "Mahfuj",
    description: 'Earned on Feb 25, 2020',
    icon: require("../../assets/Person/mahfuj.jpg"),
  },
];

export default class Badges extends Component {

  renderPost = (post) => {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 20}} >
        <Image source={post.icon} style={{height: 100, width: 100, borderRadius: 100}} />
        <Text style={{fontFamily: 'gilroy-bold', fontSize: 15}} >{post.title}</Text>
        <Text style={{fontFamily: 'gilroy-medium', fontSize: 12, opacity: 0.4}} >{post.description}</Text>
      </View>
    );
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}} >
        <StatusBar animated={true} backgroundColor="transparent" barStyle="dark-content" />
        <View style={{ flexDirection: 'row', width: 360, marginHorizontal: 20}}>
           <Ionicons name="chevron-back" size={24} style={{alignSelf: 'flex-start'}} onPress={() => this.props.navigation.navigate('Home')} />
        </View>

        <View>
          <Text style={{alignSelf: 'center', fontFamily: "gilroy-bold", fontSize: 18, marginTop: 20, marginBottom: 20}}>My earned badges</Text>
          <FlatList
            style={{marginHorizontal: 30}}
            numColumns={2}
            data={posts}
            renderItem={({ item }) => this.renderPost(item)}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View style={{flex: 1}} >
          <Text style={{alignSelf: 'center', fontFamily: "gilroy-bold", fontSize: 18, marginTop: 20, marginBottom: 20}}>Badges to earn</Text>
          <FlatList
            style={{marginHorizontal: 30, opacity: 0.3}}
            numColumns={2}
            data={badgesToEarn}
            renderItem={({ item }) => this.renderPost(item)}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }
}
