import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { Card, Title as Tit, TextInput } from "react-native-paper";
import { useSelector } from 'react-redux';
import debounce from "lodash.debounce";
import { ApiRoutes } from "../../consumers/api-routes";
import { HttpGet } from "../../consumers/http";
import BusyComponent from '../../common/BusyComponent';
import EmptyList from '../../common/EmptyList';
import AdminAttendanceComponent from '../attendance/AdminAttendanceComponent';
import {
  ACCENT,
  WHITE,
  PRY_COLOR,
} from "../../styles/colors";
import MeetingStatus, {
  MeetingStatusProp,
  MeetingStatusType,
} from "../../common/MeetingStatus";

const { Title, Content } = Card;

const MeetingAttendance = (prop: any) => {
  const appUser = useSelector((state) => state.user.loggedInUser);
  
  const {
    Id,
    MeetingName,
    StartDate,
    EndDate,
    Detail,
    CreatedBy,
    Department,
    Site,
    Done,
    Cancelled,
    LateAfter,
  } = prop.route.params.meeting;
  const [loggedInUser, setLoggedInUser] = useState(appUser);
  const [attendanceList, setAttendanceList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
    const [baseAttendanceList, setBaseAttendanceList] = useState([]);
    const [searchItem, setSearchItem] = useState("");

  const renderItem = ({ item }) => {
    return <AdminAttendanceComponent item={item} />;
  };

  const fetchAttendanceList = async () => {
    setIsLoading(true);
    const url = `${ApiRoutes.getMeetingAttendance}/${Id}`;
    await HttpGet(loggedInUser.Token, url)
      .then((res) => {
        setBaseAttendanceList(res.data);
        setAttendanceList(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(true);
      });
  }

  useEffect(() => {
    let mounted = true;
    
    if (mounted) {
      fetchAttendanceList();
    }

    return () => {
      mounted = false;
    }
  }, []);

  const getMeetingStatus = () => {
    if (Done) {
      const meeting: MeetingStatusProp = {
        type: MeetingStatusType.Done,
        status: "Done",
        onPress: () => {},
      };
      return <MeetingStatus meetingStatus={meeting} />;
    }

    if (Cancelled) {
      const meeting: MeetingStatusProp = {
        type: MeetingStatusType.Cancelled,
        status: "Cancelled",
        onPress: () => {},
      };
      return <MeetingStatus meetingStatus={meeting} />;
    }

    if (Done == null && Cancelled == null) {
      const meeting: MeetingStatusProp = {
        type: MeetingStatusType.Pending,
        status: "Pending",
        onPress: () => {
          // should only be able to this for a meeting that is pending
          console.log("raise a modal to mark done or cancelled");
        },
      };
      return <MeetingStatus meetingStatus={meeting} />;
    }
  };

  const getAttendeesCount = () => {
    if (attendanceList && attendanceList.length) {
      return attendanceList.length > 1
        ? `${attendanceList.length} Attendees`
        : `${attendanceList.length} Attendee`;
    }
    return "";
  }

  const serachData = debounce((param) => {
    const serachResult = baseAttendanceList.filter((item) => {
      return (
        (item.Email &&
          item.Email.length &&
          item.Email.toString().toLowerCase().includes(param.toLowerCase())) ||
        item.FirstName.toString().toLowerCase().includes(param.toLowerCase()) ||
        item.LastName.toString().toLowerCase().includes(param.toLowerCase()) ||
        item.MeetingName.toString()
          .toLowerCase()
          .includes(param.toLowerCase()) ||
        item.DepartmentName.toString().toLowerCase().includes(param.toLowerCase()) ||
        item.Status.toString().toLowerCase().includes(param.toLowerCase())
      );
    });
    setAttendanceList(serachResult);
  }, 500);

  const clearSearch = () => {
    setSearchItem("");
    setAttendanceList(baseAttendanceList);
  };

  return (
    <View style={styles.container}>
      <View>
        <Card style={styles.card}>
          <Title
            titleStyle={styles.title}
            title={MeetingName}
            subtitleStyle={styles.content}
            subtitle={`${moment(StartDate).format(
              "dddd, MMMM Do YYYY"
            )} || ${moment(StartDate).format("LT")} - ${moment(EndDate).format(
              "LT"
            )}`}
          />
          <Content>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Tit style={styles.content}>{Department}</Tit>
              {getMeetingStatus()}
              {/* <Text>Search</Text> */}
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Tit style={styles.content}>Late after {LateAfter} mins</Tit>
              <Tit style={styles.content}>{getAttendeesCount()}</Tit>
            </View>
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
                  console.log("this fires");
                  clearSearch();
                  return;
                }
                setSearchItem(e);
                serachData(e);
              }}
              value={searchItem}
            />
          </Content>
        </Card>
      </View>
      <SafeAreaView style={{ flex: 1 }}>
        {isLoading ? (
          <BusyComponent />
        ) : attendanceList && attendanceList.length ? (
          <FlatList
            data={attendanceList}
            renderItem={renderItem}
            keyExtractor={(item) => item.Id}
          />
        ) : (
          <EmptyList />
        )}
      </SafeAreaView>
    </View>
  );
}

export default MeetingAttendance;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  subContainer: {},
  card: {
    backgroundColor: PRY_COLOR,
    borderRadius: 0,
  },
  content: {
    color: WHITE,
    fontSize: 16,
  },
  title: {
    color: WHITE,
    fontSize: 22,
  },
});
