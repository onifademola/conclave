import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { IconButton } from 'react-native-paper';
import ItemComponent from './ItemComponent';
import EmptyList from '../../common/EmptyList';

import { meetings } from '../../mock/data';

const Meeting = () => {
  const meetingsList = null;
  const renderItem = ({ item }) => {
    return <ItemComponent meeting={item} />;
  };

  if (!meetingsList) return <EmptyList />;
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={meetingsList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => console.log('Tochable touched!')}
        style={styles.icon}
      >
        <IconButton
          color="white"
          icon="plus-circle"
          size={70}
          onPress={() => console.log("add button pressed")}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  icon: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
  },
});

export default Meeting