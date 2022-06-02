import React, { useState, useEffect } from 'react';
import { SafeAreaView, 
  View, 
  FlatList, 
  StyleSheet,
  RefreshControl
} from 'react-native';
import { IconButton, TextInput } from "react-native-paper";
import { useSelector } from "react-redux";
import debounce from "lodash.debounce";
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
  const [baseMeetings, setBaseMeetings] = useState([]);
  const [searchItem, setSearchItem] = useState("");

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
        setBaseMeetings(sortedMeetings);
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
        setBaseMeetings(sortedMeetings);
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

  const serachData = debounce((param) => {
    const serachResult = baseMeetings.filter((item) => {
      return (
        (item.MeetingName &&
          item.MeetingName.length &&
          item.MeetingName.toString()
            .toLowerCase()
            .includes(param.toLowerCase())) ||
        item.Detail.toString().toLowerCase().includes(param.toLowerCase()) ||
        item.Department.toString().toLowerCase().includes(param.toLowerCase())
      );
    });
    setMeetings(serachResult);
  }, 500);

  const clearSearch = () => {
    setSearchItem("");
    setMeetings(baseMeetings);
  };

  if (isLoading) return <BusyComponent />;

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "flex-start" }}>
      <View
        style={{
          marginLeft: 15,
          marginRight: 15,
          marginBottom: 5,
        }}
      >
        <TextInput
          placeholder="Search"
          right={<TextInput.Icon name="close" onPress={() => clearSearch()} />}
          left={<TextInput.Icon name="card-search" />}
          style={{
            borderRadius: 3,
            borderBottomEndRadius: 3,
            borderBottomStartRadius: 3,
            borderTopLeftRadius: 3,
            borderTopRightRadius: 3,
            backgroundColor: "white",
            borderColor: "black",
            borderWidth: 0.5,
            height: 40,
          }}
          onChangeText={(e) => {
            if (!e.length) {
              clearSearch();
              return;
            }
            setSearchItem(e);
            serachData(e);
          }}
          value={searchItem}
        />
      </View>
      {!meetings || meetings.length < 1 ? (
        <View style={styles.container}>
          <EmptyList touched={() => fetchMeetings()} />
        </View>
      ) : (
        <FlatList
          data={meetings}
          renderItem={renderItem}
          keyExtractor={(item) => item.Id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
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