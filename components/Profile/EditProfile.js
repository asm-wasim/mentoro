import React, { Component } from "react";
import { View, Button, TextInput } from "react-native";
import firebase from "firebase";

export default class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      CFHandle: "",
      CCHandle: "",
      name: "",
    };
    this.onUpdate = this.onUpdate.bind(this);
  }

  async componentDidMount() {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          this.setState({
            name: snapshot.data().name,
            username: snapshot.data().username,
            CFHandle: snapshot.data().CFHandle,
            CCHandle: snapshot.data().CCHandle,
            firebaseData: true,
          });
        }
      });
  }

  onUpdate() {
    const { name, CFHandle, CCHandle, username } = this.state;
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({
        name,
        username,
        CFHandle,
        CCHandle,
      });
  }

  render() {
    return (
      <View style={{ flex: 1, marginTop: 20 }}>
        <TextInput
          placeholder='name'
          value={this.state.name}
          onChangeText={(name) => this.setState({ name })}
        />
        <TextInput
        placeholder='username'
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
        />
        <TextInput
        placeholder='CF Handle'
          value={this.state.CFHandle}
          onChangeText={(CFHandle) => this.setState({ CFHandle })}
        />
        <TextInput
        placeholder='CC Handle'
          value={this.state.CCHandle}
          onChangeText={(CCHandle) => this.setState({ CCHandle })}
        />
        <Button onPress={() => {this.onUpdate(), this.props.navigation.goBack()}} title="Update" />
      </View>
    );
  }
}
