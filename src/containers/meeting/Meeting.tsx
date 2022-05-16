import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { IconButton } from 'react-native-paper';
import ItemComponent from './ItemComponent';
import EmptyList from '../../common/EmptyList';

import { meetings } from '../../mock/data';

const renderAddIcon = () => (
  <TouchableOpacity
    activeOpacity={0.7}
    onPress={() => console.log("Tochable touched!")}
    style={styles.icon}
  >
    <IconButton
      color="white"
      icon="plus-circle"
      size={70}
      onPress={() => console.log("add button pressed")}
    />
  </TouchableOpacity>
);

const Meeting = () => {
  const meetingsList = meetings;
  const renderItem = ({ item }) => {
    return <ItemComponent meeting={item} />;
  };

  if (!meetingsList) return (
    <View style={styles.container}>
      <EmptyList />
      {renderAddIcon()}
    </View>
  );

  return (
    <SafeAreaView>
      <FlatList
        data={meetingsList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      {renderAddIcon()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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