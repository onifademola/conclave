import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { Card, IconButton, Title as Tit, Text } from "react-native-paper";
import { useSelector } from 'react-redux';
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

const { Title, Content } = Card;

const MeetingAttendance = (prop: any) => {
  const loggedInUser = useSelector(state => state.user.loggedInUser);
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
  const [attendanceList, setAttendanceList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const renderItem = ({ item }) => {
    return <AdminAttendanceComponent item={item} />;
  };

  const fetchAttendanceList = async () => {
    setIsLoading(true);
    const url = `${ApiRoutes.getMeetingAttendance}/loggedInUser.SiteId`;
    await HttpGet(loggedInUser.Token, url)
      .then((res) => {
        setAttendanceList(res.data);
        setIsLoading(false);
      })
      .catch(() => {
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

  if (isLoading) return <BusyComponent />;

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
            )} || ${moment(StartDate).format("LT")} - ${moment(
              EndDate
            ).format("LT")}`}
          />
          <Content>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Tit style={styles.content}>{Department}</Tit>
              <Text>Search</Text>
            </View>
          </Content>
        </Card>
      </View>
      <SafeAreaView style={{ flex: 1 }}>
        {attendanceList && attendanceList.length ? (
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
