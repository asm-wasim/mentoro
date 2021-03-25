import React, { Component } from "react";
import { View, Text, Button } from "react-native";

import firebase from "firebase";

export default class Feed extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>FeedScreen</Text>
        <Text>Oi kam koros na kne beta</Text>
        <Button title="Sign Out" onPress={() => firebase.auth().signOut()} />
      </View>
    );
  }
}
