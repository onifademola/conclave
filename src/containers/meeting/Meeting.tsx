import React, { useState, useEffect } from 'react';
import { SafeAreaView, 
  View, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity, 
  RefreshControl
} from 'react-native';
import { IconButton } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import ItemComponent from './ItemComponent';
import EmptyList from '../../common/EmptyList';
import { ApiRoutes } from "../../consumers/api-routes";
import { HttpGet } from "../../consumers/http";
import BusyComponent from '../../common/BusyComponent';

const renderAddIcon = () => {
  const navigation = useNavigation();
  return ( 
    <TouchableOpacity activeOpacity={0.7} style={styles.icon}>
      <IconButton
        color="white"
        icon="plus-circle"
        size={70}
        onPress={() => navigation.navigate("CreateMeeting")}
      />
    </TouchableOpacity>
  );
};

const Meeting = () => {
  const loggedInUser = useSelector(state => state.user.loggedInUser);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    const url = `${ApiRoutes.getMeetings}/${loggedInUser.SiteId}`;
    await HttpGet(loggedInUser.Token, url)
      .then((res) => {        
        setMeetings(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };
  
  const onRefresh = async () => {
    setRefreshing(true);
    const url = `${ApiRoutes.getMeetings}/${loggedInUser.SiteId}`;
    await HttpGet(loggedInUser.Token, url)
      .then((res) => {        
        setMeetings(res.data);
        setRefreshing(false);
      })
      .catch((err) => {
        setRefreshing(false);
      });
  };
  
  const renderItem = ({ item }) => {
    return <ItemComponent meeting={item} />;
  };

  if (isLoading) return <BusyComponent />;

  if (!meetings) return (
    <View style={styles.container}>
      <EmptyList />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "flex-start", }}>
      <FlatList
        data={meetings}
        renderItem={renderItem}
        keyExtractor={(item) => item.Id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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