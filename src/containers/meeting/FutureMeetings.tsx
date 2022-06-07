import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  Text,
} from "react-native";
import { IconButton, TextInput, Modal } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import debounce from "lodash.debounce";
import moment from "moment";
import ItemComponent from "./ItemComponent";
import EmptyList from "../../common/EmptyList";
import { ApiRoutes } from "../../consumers/api-routes";
import { HttpGet, HttpDelete, HttpPost } from "../../consumers/http";
import BusyComponent from "../../common/BusyComponent";
import ModalDialog from "../../common/ModalDialog";

const FutureMeetings = () => {
  const appUser = useSelector((state) => state.user.loggedInUser);
  const [loggedInUser, setLoggedInUser] = useState(appUser);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalRendering, setIsModalRendering] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [meetings, setMeetings] = useState([]);
  const [baseMeetings, setBaseMeetings] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [passedMeeting, setPassedMeeting] = useState({});

  useEffect(() => {
    fetchMeetings();
  }, []);

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

  const fetchMeetings = async () => {
    const url = `${ApiRoutes.getFutureMeetings}/${loggedInUser.SiteId}`;
    await HttpGet(loggedInUser.Token, url)
      .then((res) => {
        const filteredList = res.data.filter((f) => {
          return moment(f.StartDate).isAfter(moment());
        });
        const sortedMeetings = filteredList.sort((a: any, b: any) => {
          return a.StartDate < b.StartDate
            ? -1
            : a.StartDate > b.StartDate
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

  const UpdateMeeting = async (meeting, reoccurence) => {
    // setIsLoading(true);
    const { Id, RecurringId } = meeting;
    const recurringId = reoccurence ? RecurringId : "a";
    const url = `${ApiRoutes.updateMeeting}/${Id}/${recurringId}`;
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

  const DeleteMeeting = async (meeting, reoccurence) => {
    const { Id, RecurringId } = meeting;
    const recurringId = reoccurence ? RecurringId : "a";
    const url = `${ApiRoutes.deleteMeeting}/${Id}/${recurringId}`;
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
        if (res && !res.data) {
          setBaseMeetings([]);
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
        setBaseMeetings(sortedMeetings);
        setMeetings(sortedMeetings);
        setRefreshing(false);
      })
      .catch((err) => {
        setBaseMeetings([]);
        setMeetings([]);
        setRefreshing(false);
      });
  };

  const renderModal = (meeting) => {
    setPassedMeeting(meeting);
    setIsModalRendering(true);
  };

  const resetModal = async () => setIsModalRendering(false);

  const renderItem = ({ item }) => {
    return (
      <ItemComponent
        meeting={item}
        UpdateMeeting={UpdateMeeting}
        DeleteMeeting={DeleteMeeting}
        renderModal={renderModal}
        resetModal={resetModal}
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

  // if (isLoading) return <BusyComponent />;

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "flex-start" }}>
      {isLoading ? (
        <BusyComponent />
      ) : (
        <>
          <View
            style={{
              marginLeft: 15,
              marginRight: 15,
              marginBottom: 5,
            }}
          >
            {isModalRendering && (
              <ModalDialog
                resetModal={resetModal}
                onPressCancel={UpdateMeeting}
                onPressDelete={DeleteMeeting}
                meeting={passedMeeting}
              />
            )}
            <TextInput
              placeholder="Search"
              right={
                <TextInput.Icon name="close" onPress={() => clearSearch()} />
              }
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

          {renderAddIcon()}
        </>
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
  searchSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: "#fff",
    color: "#424242",
  },
});

export default FutureMeetings;
