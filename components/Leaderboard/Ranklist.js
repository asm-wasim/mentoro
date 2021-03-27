import * as React from 'react';
import {
  Easing,
  TextInput,
  Animated,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import Constants from 'expo-constants';
import Svg, { G, Circle, Rect } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function Ranklist({counter}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} >
      <Text>Hello</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: { fontWeight: '900', textAlign: 'center', fontFamily: 'gilroy-regular' },
});