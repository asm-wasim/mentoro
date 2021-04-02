import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  FlatList,
  Image,
  Modal,
  TextInput,
  MaskedViewComponent,
} from "react-native";

import { Ionicons, Feather } from "react-native-vector-icons";
import moment from "moment";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import FeedPostScreen from "./FeedPost";

let posts = [
  {
    id: "1",
    name: "Abdullah Al Nayem",
    text:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    timestamp: 1569109273726,
    avatar: require("../../assets/Person/nayem.jpg"),
    image: require("../../assets/Person/nayem.jpg"),
  },
  {
    id: "2",
    name: "Jahirul Islam Hridoy",
    text:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    timestamp: 1569109273726,
    avatar: require("../../assets/Person/hridoy.jpg"),
    image: require("../../assets/Person/hridoy.jpg"),
  },
  {
    id: "3",
    name: "Abir Sadat Wasim",
    text:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    timestamp: 1569109273726,
    avatar: require("../../assets/Person/wasim.jpg"),
    image: require("../../assets/Person/wasim.jpg"),
  },
  {
    id: "4",
    name: "Mujammal Ahmed",
    text:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    timestamp: 1569109273726,
    avatar: require("../../assets/Person/mujammal.jpg"),
    image: require("../../assets/Person/mujammal.jpg"),
  },
  {
    id: "5",
    name: "Kamonasish Roy",
    text:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    timestamp: 1569109273726,
    avatar: require("../../assets/Person/kamona.jpg"),
    image: require("../../assets/Person/kamona.jpg"),
  },
  {
    id: "6",
    name: "Humayun Kibria Shakib",
    text:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    timestamp: 1569109273726,
    avatar: require("../../assets/Person/shakib.jpg"),
    image: require("../../assets/Person/shakib.jpg"),
  },
  {
    id: "7",
    name: "Mahfuj Ahmed",
    text:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    timestamp: 1569109273726,
    avatar: require("../../assets/Person/mahfuj.jpg"),
    image: require("../../assets/Person/mahfuj.jpg"),
  },
];

export default class Feed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      text: '',
    };
  }

  renderPost = (post) => {
    return (
      <View style={styles.feedItem}>
        <Image source={post.avatar} style={styles.avatar} />

        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={styles.name}>{post.name}</Text>
              <Text style={styles.timestamp}>
                {moment(post.timestamp).fromNow()}
              </Text>
            </View>

            <Feather name="more-horizontal" size={24} color="#73788B" />
          </View>

          <Text style={styles.posts}>{post.text}</Text>

          <Image
            source={post.image}
            style={styles.postImage}
            resizeMode="cover"
          />

          <View style={{ flexDirection: "row" }}>
            <Feather
              name="heart"
              size={24}
              color="#73788B"
              style={{ marginRight: 16 }}
            />
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor="transparent"
          barStyle="dark-content"
        />

        <Modal visible={this.state.modalOpen}>
          <View style={styles.Modalcontainer}>
            <View style={styles.Modalheader}>
              <Feather
                name="arrow-left"
                size={24}
                color="black"
                onPress={() => this.setState({ ...this, modalOpen: false })}
              />
              <Text
                style={{ fontFamily: "poppins-medium" }}
                onPress={() => this.setState({ ...this, modalOpen: false })}
              >
                Post
              </Text>
            </View>

            <View style={styles.ModalinputContainer}>
              <Image
                source={require("../../assets/Person/nayem.jpg")}
                style={styles.Modalavatar}
              />
              <TextInput
                autoFocus={true}
                placeholder="Anything on mind to share?"
                multiline={true}
                numberOfLines={5}
                style={{
                  flex: 1,
                  backgroundColor: "#F1F7FF",
                  padding: 10,
                  borderRadius: 8,
                }}
                onChangeText={(text) => this.setState({ text })}
                value={this.state.text}
              />
            </View>
          </View>
        </Modal>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Feed</Text>
        </View>

        <TouchableOpacity style={styles.ModalShowcontainer} onPress={() => this.setState({ ...this, modalOpen: true })} >
          <View style={styles.ModalinputContainer}>
            <Image
              source={require("../../assets/Person/nayem.jpg")}
              style={styles.Modalavatar}
            />
            <View
              style={{
                flex: 1,
                backgroundColor: "#F1F7FF",
                padding: 10,
                borderRadius: 8,
              }}
            >
              <Text style={{color: 'grey', fontFamily: 'poppins-regular'}} >Anything on mind to share?</Text>
            </View>
          </View>
        </TouchableOpacity>

        <FlatList
          style={styles.feed}
          data={posts}
          renderItem={({ item }) => this.renderPost(item)}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFECF4",
  },
  header: {
    paddingBottom: 5,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EBECF4",
    elevation: 10,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: "poppins-medium",
  },
  feed: {
    marginHorizontal: 16,
  },
  feedItem: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  name: {
    fontSize: 15,
    fontFamily: "poppins-medium",
    color: "#454D65",
  },
  timestamp: {
    fontSize: 11,
    fontFamily: "poppins-medium",
    color: "#C4C6CE",
  },
  post: {
    marginTop: 16,
    fontSize: 14,
    color: "#838899",
  },
  postImage: {
    height: 150,
    borderRadius: 5,
    marginVertical: 16,
  },
  Modalcontainer: {
    flex: 1,
    backgroundColor: "white",
  },
  ModalShowcontainer: {
    // marginTop: 10,
    // borderRadius: 5,
    // marginHorizontal: 16,
    // backgroundColor: "white",
  },
  Modalheader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 0.2,
    borderBottomColor: "grey",
  },
  ModalinputContainer: {
    margin: 32,
    flexDirection: "row",
  },
  Modalavatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
    marginRight: 16,
  },
});
