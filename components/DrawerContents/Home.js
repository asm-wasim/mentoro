import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { ScrollView } from "react-native-gesture-handler";
import Deck from "../Deck";
import Cards from "../Cards";

const DATA = [
  {
    id: 1,
    time: "Starts at 08:35",
    title: "Codeforces",
    number: "Global Round 532",
  },
  {
    id: 2,
    title: "Codechef",
    time: "Starts at 10:00",
    number: "March Chellenge",
  },
  {
    id: 3,
    title: "LightOJ",
    time: "Starts at 04:00",
    number: "Beginner Contest",
  },
];

export default class Home extends Component {
  renderCard(item) {
    return (
      <View key={item.id} style={styles.cardContainer}>
        <View style={styles.card}>
          <View>
            <Text style={styles.title}>{item.time}</Text>
            <Icon
              name="ios-remove"
              size={40}
              color="red"
              style={{ marginTop: 25 }}
            />
            <Text style={styles.number}>{item.number}</Text>
          </View>
          <View style={{ marginLeft: 150, marginTop: 18 }}>
            <Text style={styles.textCovid}>{item.title}</Text>
          </View>
        </View>
      </View>
    );
  }

  renderNoMoreCards() {
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={styles.noCard}>This is all for now.</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <View style={{height: 15}} />
        <ScrollView 
          style={{ backgroundColor: 'transparent' }}
        >
          {/* <ImageBackground
          source={require("../../assets/world.jpg")}
          style={styles.map}
        > */}
          <View style={styles.col}>
            <View style={{ width: "50%" }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.toggleDrawer()}
              >
                <Icon name="md-remove" color="black" size={26} />
                <Icon
                  name="md-remove"
                  color="black"
                  size={26}
                  style={styles.minusIcon}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.avatarContainer}>
              <Icon name="send-outline" color="black" size={26} />
            </View>
          </View>
          <Text style={styles.textDash}>Hello, whonayem01</Text>

          {/* </ImageBackground> */}
          <Deck
            data={DATA}
            renderCard={this.renderCard}
            renderNoMoreCards={this.renderNoMoreCards}
          />
          <View>
            <Text
              style={{
                marginLeft: 20,
                marginTop: 170,
                color: "black",
                fontFamily: "poppins-bold",
                fontSize: 20,
              }}
            >
              Recommeded
            </Text>
            <ScrollView
              style={{ marginTop: 20, backgroundColor: 'transparent' }}
              showsHorizontalScrollIndicator={false}
              horizontal
            >
              <Cards bg="red" idx={0} />
              <Cards bg="red" idx={1} />
              <Cards bg="red" idx={2} />
            </ScrollView>

            <Text
              style={{
                marginLeft: 20,
                marginTop: 20,
                color: "black",
                fontFamily: "poppins-bold",
                fontSize: 20,
              }}
            >
              Categories
            </Text>
            <ScrollView
              style={{ marginTop: 20 }}
              showsHorizontalScrollIndicator={false}
              horizontal
            >
              <Cards bg="red" idx={3} />
              <Cards bg="red" idx={4} />
              <Cards bg="red" idx={5} />
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "lightblue",
    marginBottom: 20,
  },
  cardContainer: {
    height: 150,
    width: 320,
    alignSelf: "center",
    backgroundColor: "#6A706E",
    borderRadius: 30,
  },
  card: {
    height: 150,
    width: 260,
    paddingTop: 20,
    paddingHorizontal: 30,
    backgroundColor: "#2b3240",
    borderRadius: 30,
    flexDirection: "row",
  },
  title: {
    color: "#6A706E",
    width: 150,
    fontSize: 16,
    fontWeight: "bold",
  },
  number: {
    color: "#FFF",
    width: 200,
    fontSize: 22,
    fontWeight: "bold",
    marginTop: -10,
  },
  textCovid: {
    transform: [{ rotate: "-90deg" }],
    color: "#3a4b4f",
    fontSize: 18,
    width: 100,
    marginLeft: -145,
    fontWeight: "bold",
    marginTop: 20,
  },
  noCard: {
    marginBottom: 10,
    color: "black",
    alignSelf: "center",
  },
  map: {
    height: 200,
    paddingTop: 15,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  col: {
    flexDirection: "row",
    marginHorizontal: 20,
  },
  minusIcon: {
    marginTop: -20,
    marginLeft: 5,
  },
  avatarContainer: {
    width: "50%",
    alignItems: "flex-end",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  textDash: {
    color: "black",
    fontSize: 20,
    alignSelf: "center",
    marginTop: 15,
    fontFamily: "bernhardt-bold",
    marginBottom: 20,
  },
  colContainer: {
    flexDirection: "row",
    paddingHorizontal: 30,
    marginTop: 40,
    alignItems: "center",
  },
  textGlobal: {
    fontWeight: "bold",
    fontSize: 16,
    color: "red",
  },
  textRussia: {
    fontWeight: "bold",
    fontSize: 16,
    paddingHorizontal: 30,
    color: "#6a706e",
  },
  reloadContainer: {
    backgroundColor: "#FFF",
    elevation: 2,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 50,
  },
});
