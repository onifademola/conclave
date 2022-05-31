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
import { HttpGet, HttpDelete, HttpPost } from "../../consumers/http";
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

const FutureMeetings = () => {
  const appUser = useSelector((state) => state.user.loggedInUser);
  const [loggedInUser, setLoggedInUser] = useState(appUser);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    const url = `${ApiRoutes.getFutureMeetings}/${loggedInUser.SiteId}`;
    await HttpGet(loggedInUser.Token, url)
      .then((res) => {
        const sortedMeetings = res.data.sort((a: any, b: any) => {
          return a.StartDate < b.StartDate
            ? -1
            : a.StartDate > b.StartDate
            ? 1
            : 0;
        });
        setMeetings(sortedMeetings);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const UpdateMeeting = async (meeting) => {
    // setIsLoading(true);
    const { Id } = meeting;
    const url = `${ApiRoutes.updateMeeting}/${Id}`;
    await HttpPost(loggedInUser.Token, url, meeting)
      .then(async (res) => {
        if (res && res.status === 200) {
          await fetchMeetings()
            .then((res) => res)
            .catch(() => "An error occured.");
        } else {
          return "An error occured.";
        }
      })
      .catch((err) => {
        return "An error occured.";
      });
  };

  const DeleteMeeting = async (meetingId) => {
    const url = `${ApiRoutes.deleteMeeting}/${meetingId}`;
    await HttpDelete(loggedInUser.Token, url)
      .then(async (res) => {
        if (res && res.status === 200) {
          await fetchMeetings()
            .then((res) => res)
            .catch(() => "An error occured.");
        } else {
          return "An error occured.";
        }
      })
      .catch((err) => {
        return "An error occured.";
      });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    const url = `${ApiRoutes.getFutureMeetings}/${loggedInUser.SiteId}`;
    await HttpGet(loggedInUser.Token, url)
      .then((res) => {
        console.log(res)
        if (!res.data) {
          setMeetings([]);
          setRefreshing(false);
          return;
        }
        const sortedMeetings = res.data.sort((a: any, b: any) => {
          return a.StartDate < b.StartDate
            ? -1
            : a.StartDate > b.StartDate
            ? 1
            : 0;
        });
        setMeetings(sortedMeetings);
        setRefreshing(false);
      })
      .catch((err) => {
        setMeetings([]);
        setRefreshing(false);
      });
  };

  const renderItem = ({ item }) => {
    return (
      <ItemComponent
        meeting={item}
        UpdateMeeting={UpdateMeeting}
        DeleteMeeting={DeleteMeeting}
      />
    );
  };

  if (isLoading) return <BusyComponent />;

  if (!meetings || meetings.length < 1)
    return (
      <View style={styles.container}>
        <EmptyList />
      </View>
    );

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "flex-start" }}>
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
};

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

export default FutureMeetings;
