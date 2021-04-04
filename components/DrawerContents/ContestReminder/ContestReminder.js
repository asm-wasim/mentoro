import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Modal } from 'react-native';

//import { Colors } from 'react-native/Libraries/NewAppScreen';

import colors from '../../../statics/colors';
import tempData from '../../../statics/tempData';
import { AntDesign } from '@expo/vector-icons';
import Contests from './Contests';
import AddContest from './AddContest';

export default class ContestReminder extends React.Component {

  state = {
    addTodoVisible: false,
  };

  toggleAddTodoModal() {
    this.setState({ addTodoVisible: !this.state.addTodoVisible });
  }

  renderList = list => {
    return <Contests list={list}/>;
  }

  render() {
    return (
      <View style={styles.container}>

        <Modal 
            animationType="slide"
            visible={this.state.addTodoVisible}
            onRequestClose={() => this.toggleAddTodoModal()}
        >

          <AddContest closeModal={() => this.toggleAddTodoModal()}/>

        </Modal>

        <View style={{height: '5%', backgroundColor: 'orange'}} ></View>

        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <View style={styles.divider} />
          <Text style={styles.title}>
            Contest <Text style={{ fontFamily: 'redhatdisplay-bold', color: 'skyblue' }}>Reminder</Text>
          </Text>
          <View style={styles.divider} />
        </View>

        <View style={{ marginVertical: 48, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity style={styles.addList} onPress={() => this.toggleAddTodoModal()}>
            <AntDesign name="plus" size={16} color={colors.blue} />
          </TouchableOpacity>

          <Text style={styles.add}>Add Contest</Text>

        </View>

        {/* <View style={{ height: 275, paddingLeft: 32 }}> */}
        <View style={{ flex: 1, height: 275, width: '90%' }}>
          <FlatList
            data={tempData}
            keyExtractor={item => item.name}
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => this.renderList(item)}
          />
        </View>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  divider: {
    backgroundColor: colors.lightBlue,
    height: 2,
    flex: 1,
    alignSelf: 'center',
  },
  title: {
    paddingHorizontal: 15,
    fontFamily: 'redhatdisplay-regular',
    fontSize: 38,
    color: colors.balck,
  },
  addList: {
    borderWidth: 2,
    borderColor: colors.lightBlue,
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  add: {
    color: colors.blue,
    fontWeight: '600',
    fontSize: 14,
    marginTop: 8,
  },
});