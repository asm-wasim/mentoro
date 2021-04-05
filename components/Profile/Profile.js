import React, { Component, Profiler, useState, useEffect, useCallback } from "react";
import {
  Image,
  TextInput,
  Animated,
  Text,
  View,
  StyleSheet,
  StatusBar,
  Button,
  FlatList,
  ActivityIndicator,
  LogBox
} from "react-native";
import Constants from "expo-constants";
import Svg, { G, Circle, Rect } from "react-native-svg";

import firebase from "firebase";
import moment from "moment";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";

// import BadgesData from '../../statics/BadgesData'
import Donut from "./Donut";
import EditProfileScreen from "./EditProfile";
import LoaderScreen from "../../statics/Loader";
import { call } from "react-native-reanimated";

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
    name: "Abdullah Al Nayem",
    text:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    timestamp: 1569109273726,
    avatar: require("../../assets/Person/nayem.jpg"),
    image: require("../../assets/Person/nayem.jpg"),
  },
  {
    id: "3",
    name: "Abdullah Al Nayem",
    text:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    timestamp: 1569109273726,
    avatar: require("../../assets/Person/nayem.jpg"),
    image: require("../../assets/Person/nayem.jpg"),
  },
  {
    id: "4",
    name: "Abdullah Al Nayem",
    text:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    timestamp: 1569109273726,
    avatar: require("../../assets/Person/nayem.jpg"),
    image: require("../../assets/Person/nayem.jpg"),
  }
];

let BadgesData = [
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
    title: "Muja",
    description: 'Earned on Sep 08, 2019',
    icon: require("../../assets/Person/mujammal.jpg"),
  },
];

let counter = 0;

const getSubmissions = (submissions, verdict) =>
  submissions.filter((submission) => submission.verdict === verdict);

const isSameProblem = (p1, p2) =>
  p1.name === p2.name && Math.abs(p1.contestId - p2.contestId) <= 1;

const removeDuplicateProblems = (submissions) => {
  submissions.sort((a, b) =>
    a.problem.name === b.problem.name
      ? a.problem.contestId - b.problem.contestId
      : a.problem.name < b.problem.name
        ? -1
        : 1
  );
  return submissions.filter(
    ({ problem }, index) =>
      !index || !isSameProblem(submissions[index - 1].problem, problem)
  );
};

const getProblems = (submissions) => {
  const ac = getSubmissions(submissions, "OK");
  return removeDuplicateProblems(ac);
};
const Calculate_Point = (Point) => {
  Point = Point.toFixed(2);
  Point = Point * (1.0 / 18.0);
  Point = Math.min(Point, 100.0);
  return Point;
}

const getMonthName = monthIndex => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  return months[monthIndex];
};

const convertTime = (date) => {
   let time;
   let AMorPM = "AM";
   if(date.getHours() > 12) AMorPM = "PM";
   let hour = (date.getHours()%12).toString();
   let minute = date.getMinutes().toString();
   let second = date.getSeconds().toString();
   if(hour.length === 1) hour = "0"+ hour;
   if(minute.length === 1) minute = "0"+ minute;
   if(second.length === 1) second = "0"+ second;
   time = hour;
   time += ":"
   time += minute;
   time += ":"
   time += second;
   time += " ";
   time += AMorPM;
   return time;
}


export default function Profile({ navigation }) {
  const [profilePicture, setProfilePicture] = useState("https://meetanentrepreneur.lu/wp-content/uploads/2019/08/profil-linkedin.jpg");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [CFHandle, setCFHandle] = useState("");

  const [firebaseLoaded1, setfirebaseLoaded1] = useState(false);
  const [firebaseCalled1, setfirebaseCalled1] = useState(false);
  const [firebaseLoaded2, setfirebaseLoaded2] = useState(false);
  const [firebaseCalled2, setfirebaseCalled2] = useState(false);

  const [submissions, setSubmissions] = useState([]);
  const [totalCodeforcesSolved, setTotalCodeforcesSolved] = useState(0);
  const [cfUserStatusLoaded, setCfUserStatusLoaded] = useState(false);
  const [cfUserStatusCalled, setCfUserStatusCalled] = useState(false);

  const [cfPoint, setCfPoint] = useState(0.0);
  const [cfPointLoaded, setCfPointLoaded] = useState(false);
  const [cfPointCalled, setCfPointCalled] = useState(false);

  const [recentActivity, setRecentActivity] = useState([]);
  const [recentActivityLoaded, setRecentActivityLoaded] = useState(false);
  const [recentActivityCalled, setRecentActivityCalled] = useState(false);

  const [ownerPost, setOwnerPost] = useState([]);
  const [ownerPostLoaded, setOwnerPostLoaded] = useState(false);
  const [ownerPostCalled, setOwnerPostCalled] = useState(false);

  //Error Solved
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, [])

  //Codeforces Section
  const get_codeforces_data = useCallback(() => {
    // console.log("CF 1");
    let link = "https://codeforces.com/api/user.status?handle={handle}"; //Recive all submissions
    link = link.replace("{handle}", CFHandle);
    fetch(link)
      .then((res) => res.json())
      .then((res) => res.result)
      .then((res) => {
        setSubmissions(res);
        setCfUserStatusLoaded(true);
        // const ac = getProblems(res)
        // setTotalCodeforcesSolved(ac.length);
      });
  })

  const get_cf_user_details = useCallback(() => {
    // console.log("CF 2");
    let link2 = "https://codeforces.com/api/user.info?handles={handle}";
    link2 = link2.replace("{handle}", CFHandle);
    fetch(link2)
      .then((res) => res.json())
      .then((res) => res.result)
      .then((res) => {
        setCfPoint(res[0].rating);
        setCfPointLoaded(true);
      })
  })
  // Firebase Section
  const current_user_data = useCallback(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        //console.log(snapshot);
        setName(snapshot.data().name);
        setUserName(snapshot.data().username);
        setEmail(snapshot.data().email);
        setCFHandle(snapshot.data().CFHandle);
        setfirebaseLoaded1(true);
      });
    // console.log("One")
  })

  const get_user_profile_data = () => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setProfilePicture(snapshot.data().downloadURL)
        }
        setfirebaseLoaded2(true);
      });
    // console.log("Two")
  }

  const make_recent_activity_list = useCallback(() => {
    let i = 0;
    let RA = [];
    for (i = 0; i < Math.min(5, submissions.length); i++) {
      RA.push(submissions[i]);
    }
    if (i === 5) {
      setRecentActivity(RA);
      setRecentActivityLoaded(true);
    }
  })

  const get_owner_post = useCallback(() => {
    firebase
      .firestore()
      .collection("blog")
      .orderBy("creation", 'desc')
      .get()
      .then((querySnapshot) => {
        let tempPost = [];
        let postNo = 0;
        querySnapshot.forEach((documentSnapshot) => {
          if(documentSnapshot.data().currentUserName === name){
            tempPost.push(documentSnapshot.data());
            tempPost[postNo].postNo = postNo;
            postNo++;
          }
        });
        setOwnerPostLoaded(true);
        setOwnerPost(tempPost);
      });
  })

  // const onLogout = () => {
  //   console.log("Logged out!");
  //   firebase.auth().signOut();
  //   navigation.navigate("Splash");
  // };

  if (!firebaseLoaded1) {
    if (!firebaseCalled1) {
      setfirebaseCalled1(true);
      current_user_data();
    }
    return (
      <View style={[styles.activitycontainer, styles.horizontal]}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }
  if (firebaseLoaded1 && !firebaseLoaded2) {
    if (!firebaseCalled2) {
      setfirebaseCalled2(true);
      get_user_profile_data();
    }
    return (
      <View style={[styles.activitycontainer, styles.horizontal]}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  if (firebaseLoaded1 && firebaseLoaded2 && !cfUserStatusLoaded) {
    if (!cfUserStatusCalled) {
      setCfUserStatusCalled(true);
      get_codeforces_data();
    }
    return (
      <View style={[styles.activitycontainer, styles.horizontal]}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }
  if (firebaseLoaded1 && firebaseLoaded2 && cfUserStatusLoaded && !cfPointLoaded) {
    if (!cfPointCalled) {
      setCfPointCalled(true);
      get_cf_user_details();
    }
    return (
      <View style={[styles.activitycontainer, styles.horizontal]}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }
  if (firebaseLoaded1 && firebaseLoaded2 && cfUserStatusLoaded && cfPointLoaded && !recentActivityLoaded) {
    if (!recentActivityCalled) {
      setRecentActivityCalled(true);
      make_recent_activity_list();
    }
    return (
      <View style={[styles.activitycontainer, styles.horizontal]}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  if (firebaseLoaded1 && firebaseLoaded2 && cfUserStatusLoaded && cfPointLoaded && recentActivityLoaded && !ownerPostLoaded) {
    if (!ownerPostCalled) {
      setOwnerPostCalled(true);
      get_owner_post();
      return (
        <View style={[styles.activitycontainer, styles.horizontal]}>
          <ActivityIndicator size="large" color="green" />
        </View>
      );
    }
  }

  if (firebaseLoaded1 && firebaseLoaded2 && cfUserStatusLoaded && cfPointLoaded && recentActivityLoaded) {
    const renderPost = (post) => {
      return (
        <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', marginLeft: 15 }} >
          <Image source={post.icon} style={{ height: 45, width: 45, borderRadius: 100 }} />
          <Text style={{ fontFamily: 'gilroy-bold', fontSize: 14 }} >{post.title}</Text>
        </View>
      );
    };

    const renderBlog = (post) => {
      let date = new Date(post.creation.seconds*1000);
      let time = convertTime(date);
      return (
        <View style={styles.feedItem}>
          <Image source={{ uri: post.currentUserProfilePhoto }} style={styles.avatar} />

          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <Text style={styles.name}>{post.currentUserName}</Text>
                <Text style={styles.timestamp}>
                {getMonthName(date.getMonth())} {date.getDate()}, {date.getFullYear()}  {time}
                </Text>
              </View>

              <Feather name="more-horizontal" size={24} color="#73788B" />
            </View>

            <Text style={styles.posts}>{post.currentUserPostContent}</Text>

            {/* <Image
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
            </View> */}
          </View>
        </View>
      );
    };

    const renderRecentActivity = (item) => {
      // console.log(item, "Recent");
      if (item.verdict === "WRONG_ANSWER") {
        return (
          <View style={styles.recentItem} >
            <Ionicons name='close-circle-outline' size={24} color='red' style={styles.iconActivityIndicator} />
            <View style={{ width: 250, marginBottom: 10 }} >
              <Text style={styles.activityText} >
                Wrong submission on CF {item.problem.contestId}-{item.problem.index} "{item.problem.name}"
                </Text>
            </View>
          </View>
        )
      }
      else if (item.verdict === "OK") {
        return (
          <View style={styles.recentItem} >
            <Ionicons name='checkmark-done-circle-outline' size={24} color='green' style={styles.iconActivityIndicator} />
            <View style={{ width: 250, marginBottom: 10 }} >
              <Text style={styles.activityText} >
                Solved CF {item.problem.contestId}-{item.problem.index} "{item.problem.name}"
                </Text>
            </View>
          </View>
        )
      }
    }
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#F4F5F7",
        }}
      >
        <StatusBar animated={true} backgroundColor="#1B2A48" barStyle="dark-content" />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ backgroundColor: '#1B2A48', alignItems: 'center', justifyContent: 'center', borderBottomEndRadius: 30, borderBottomStartRadius: 30 }} >

            <View style={{ flex: 1, flexDirection: 'row', marginBottom: 40, backgroundColor: 'transparent', width: 370 }}>
              <Ionicons name="chevron-back-outline" size={24} color="white" onPress={() => navigation.goBack()} />
              <Feather name="edit" size={22} color="white" onPress={() => navigation.navigate("EditProfile")} style={{ marginLeft: 320 }} />
            </View>


            <Image style={{ height: 150, width: 150, borderRadius: 100 }} source={{ uri: profilePicture }} resizeMode="cover" />
            <View style={styles.add}>
              <TouchableOpacity onPress={() => navigation.navigate("PickImage")}>
                <Ionicons name="ios-add" size={35} color="#DFD8C8" style={{ marginTop: 0, marginLeft: 0 }} />
              </TouchableOpacity>
            </View>
            <Text style={{ fontFamily: 'gilroy-bold', color: 'white', fontSize: 28, marginTop: 20 }}>{name}</Text>
            <Text style={{ fontFamily: 'gilroy-medium', color: 'white', fontSize: 16, marginTop: 5, marginBottom: 150 }}>{userName}</Text>
          </View>

          {/* <View style={styles.infoContainer}>
            <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{name}</Text>
            <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>{email}</Text>
          </View> */}

          <View style={styles.pointsBox}>
            <View style={{ flex: 1, marginTop: 15 }}>
              <Text style={[styles.text, { fontSize: 24 }]}>Your Points</Text>
              {/* <Text style={[styles.ext, styles.subText]}>+20 since last week</Text> */}
            </View>
            <Donut key={1} percentage={Calculate_Point(cfPoint)} color={"skyblue"} delay={500 + 100 * 1} max={100.0} />
            <View style={[styles.OJContainer, { marginTop: 0, marginHorizontal: 20 },]}>
              <View style={{ flex: 1, alignItems: "center", justifyContent: "center", }}>
                <Ionicons name="ellipse" color="skyblue" />
                <Text style={[styles.text, { fontWeight: "200" }]}>Codeforces</Text>
              </View>
              <View style={{ flex: 1, alignItems: "center", justifyContent: "center", }}>
                <Ionicons name="ellipse" color="darkmagenta" />
                <Text style={[styles.text, { fontWeight: "200" }]}>Codechef</Text>
              </View>
            </View>
          </View>

          <Text style={{ fontFamily: 'gilroy-bold', fontSize: 18, alignSelf: 'center', marginBottom: 10 }} >My Badges</Text>
          <Text style={{ fontFamily: 'gilroy-medium', fontSize: 13, alignSelf: 'center', opacity: 0.4 }} >take a look at what badges you've earned</Text>

          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 100, marginHorizontal: 20, marginTop: 10, backgroundColor: 'white', marginBottom: 20, borderRadius: 30 }} >
            <FlatList
              horizontal={true}
              data={BadgesData}
              renderItem={({ item }) => renderPost(item)}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            />
            <TouchableOpacity style={{ backgroundColor: 'orange', marginRight: 10, height: 40, width: 90, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }} onPress={() => navigation.navigate('Badges')} >
              <Text style={{ fontFamily: 'gilroy-bold', color: 'white' }} >View all</Text>
            </TouchableOpacity>
          </View>

          {/* <View style={styles.statsContainer}>
            <View style={styles.statsBox}>
              <Text style={[styles.text, { fontSize: 24 }]}>14</Text>
              <Text style={[styles.ext, styles.subText]}>last 7 days </Text>
            </View>

            <View style={[styles.statsBox,{borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1,},]}>
              <Text style={[styles.text, { fontSize: 24 }]}>67</Text>
              <Text style={[styles.ext, styles.subText]}>last 30 days</Text>
            </View>

            <View style={styles.statsBox}>
              <Text style={[styles.text, { fontSize: 24 }]}>{totalCodeforcesSolved}</Text>
              <Text style={[styles.ext, styles.subText]}>total</Text>
            </View>
          </View> */}

          <Text style={{ marginLeft: 40, marginTop: 30, marginBottom: 15, fontFamily: 'gilroy-bold' }} >RECENT ACTIVITY</Text>



          <View style={{ marginLeft: 40 }} >

            <FlatList
              data={recentActivity}
              renderItem={({ item }) => renderRecentActivity(item)}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={true}
            />

            {/* <View style={styles.recentItem} >
              <Ionicons name='heart' size={24} color='purple' style={styles.iconActivityIndicator} />
              <View style={{ width: 250, marginBottom: 10 }} >
                <Text style={styles.activityText} >
                  Started following whonayem01
                </Text>
              </View>
            </View>

            

            <View style={styles.recentItem} >
              <Ionicons name='close-circle-outline' size={24} color='red' style={styles.iconActivityIndicator} />
              <View style={{ width: 250, marginBottom: 10 }} >
                <Text style={styles.activityText} >
                  Wrong submission on CF-1130-D "Alice and Bob playing games"
                </Text>
              </View>
            </View>

            <View style={styles.recentItem} >
              <Ionicons name='checkmark-done-circle-outline' size={24} color='green' style={styles.iconActivityIndicator} />
              <View style={{ width: 250, marginBottom: 10 }} >
                <Text style={styles.activityText} >
                  Solved CF 1287-D "Vasya and her plane"
                </Text>
              </View>
            </View>

            <View style={styles.recentItem} >
              <Ionicons name='checkmark-done-circle-outline' size={24} color='green' style={styles.iconActivityIndicator} />
              <View style={{ width: 250, marginBottom: 10 }} >
                <Text style={styles.activityText} >
                  Solved CF 786-E "Tree and Queries"
                </Text>
              </View>
            </View> */}

          </View>

          <Text style={{ fontFamily: 'gilroy-bold', fontSize: 18, alignSelf: 'center', marginBottom: 10, marginTop: 20 }} >Classmates</Text>
          <Text style={{ fontFamily: 'gilroy-medium', fontSize: 13, alignSelf: 'center', opacity: 0.4 }} >All interested in the same field!</Text>
          <Text style={{ fontFamily: 'gilroy-medium', fontSize: 13, alignSelf: 'center', opacity: 0.4 }} >Go on, get social!</Text>

          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 100, marginHorizontal: 20, marginTop: 10, backgroundColor: 'white', marginBottom: 20, borderRadius: 30 }} >
            <FlatList
              horizontal={true}
              data={BadgesData}
              renderItem={({ item }) => renderPost(item)}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            />
            <TouchableOpacity style={{ backgroundColor: 'orange', marginRight: 10, height: 40, width: 90, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }} onPress={() => navigation.navigate('Badges')} >
              <Text style={{ fontFamily: 'gilroy-bold', color: 'white' }} >View all</Text>
            </TouchableOpacity>
          </View>

          <Text style={{ fontFamily: 'gilroy-bold', fontSize: 18, alignSelf: 'center', marginBottom: 10, marginTop: 20 }} >My Contributions</Text>


          <FlatList
            style={styles.feed}
            data={ownerPost}
            renderItem={({ item }) => renderBlog(item)}
            keyExtractor={(item) => item.postNo}
            showsVerticalScrollIndicator={true}
          />
        </ScrollView>
        {/* <Button onPress={() => onLogout()} title="Log Out" /> */}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  text: {
    fontFamily: "redhatdisplay-bold",
    color: "#52575D",
  },
  subText: {
    fontSize: 12,
    color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500",
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    backgroundColor: '#1B2A48',
  },
  profileImage: {
    width: 170,
    height: 170,
    borderRadius: 100,
    overflow: "hidden",
  },
  dm: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: 10,
    width: 40,
    height: 40,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  active: {
    backgroundColor: "#34FF89",
    position: "absolute",
    bottom: 28,
    left: 5,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 100,
  },
  add: {
    backgroundColor: "#41444B",
    position: "absolute",
    left: 230,
    top: 170,
    width: 40,
    height: 40,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 25,
  },
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32,
  },
  statsBox: {
    alignItems: "center",
    flex: 1,
  },
  pointsBox: {
    marginTop: -100,
    margin: 40,
    backgroundColor: "white",
    height: 270,
    borderRadius: 40,
    elevation: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  pointsBoxContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  OJContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  donutText: {
    fontWeight: "900",
    textAlign: "center",
  },
  activitycontainer: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  activityText: {
    fontFamily: "redhatdisplay-regular",
    color: "#52575D",
  },
  recent: {
    marginLeft: 78,
    marginTop: 32,
    fontSize: 10,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  recentItemIndicator: {
    backgroundColor: "#CABFAB",
    padding: 4,
    height: 12,
    width: 12,
    borderRadius: 6,
    marginTop: 5,
    marginRight: 20,
    left: 5,
  },
  iconActivityIndicator: {
    marginRight: 20,
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
});