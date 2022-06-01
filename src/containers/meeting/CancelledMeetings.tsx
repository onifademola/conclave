import React, { useState, useEffect } from 'react';
import { SafeAreaView, 
  View, 
  FlatList, 
  StyleSheet,
  RefreshControl
} from 'react-native';
import { useSelector } from "react-redux";
import ItemComponent from './ItemComponent';
import EmptyList from '../../common/EmptyList';
import { ApiRoutes } from "../../consumers/api-routes";
import { HttpGet } from "../../consumers/http";
import BusyComponent from '../../common/BusyComponent';

const CancelledMeetings = () => {
  const appUser = useSelector((state) => state.user.loggedInUser);
  const [loggedInUser, setLoggedInUser] = useState(appUser);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    const url = `${ApiRoutes.getCancelledMeetings}/${loggedInUser.SiteId}`;
    await HttpGet(loggedInUser.Token, url)
      .then((res) => {
        const sortedMeetings = res.data.sort((a: any, b: any) => {
          return b.StartDate < a.StartDate
            ? -1
            : b.StartDate > a.StartDate
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
    console.log("Not implemented.");
  };

  const DeleteMeeting = async (meetingId) => {
    console.log("Not implemented.");
  };

  const onRefresh = async () => {
    setRefreshing(true);
    const url = `${ApiRoutes.getCancelledMeetings}/${loggedInUser.SiteId}`;
    await HttpGet(loggedInUser.Token, url)
      .then((res) => {
        const sortedMeetings = res.data.sort((a: any, b: any) => {
          return b.StartDate < a.StartDate
            ? -1
            : b.StartDate > a.StartDate
            ? 1
            : 0;
        });
        setMeetings(sortedMeetings);
        setRefreshing(false);
      })
      .catch((err) => {
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
        <EmptyList touched={() => fetchMeetings()} />
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

export default CancelledMeetings;