import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { Card, IconButton, Title as Tit, Text } from "react-native-paper";
import BusyComponent from '../../common/BusyComponent';
import EmptyList from '../../common/EmptyList';
import AdminAttendanceComponent from '../attendance/AdminAttendanceComponent';
import { meetings, meetingAttendance } from "../../mock/data";
import {
  ACCENT,
  WHITE,
  PRY_COLOR,
} from "../../styles/colors";

const { Title, Content } = Card;

const MeetingAttendance = (prop: any) => {
  const { id, meetingName, startDate, endDate, departmentId, detail } = prop.route.params.meeting;
  const [attendanceList, setAttendanceList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const renderItem = ({ item }) => {
    return <AdminAttendanceComponent item={item} />;
  };

  useEffect(() => {
    if (id) {
      const list = meetingAttendance.filter(f => f.meetingId === id);
      console.log('list: ', list);
      if(list) {
        setAttendanceList(list);
      }
    }
  }, []);

  if (isLoading) return <BusyComponent />;

  return (
    <View style={styles.container}>
      <View>
        <Card style={styles.card}>
          <Title
            titleStyle={styles.title}
            title={meetingName}
            subtitleStyle={styles.content}
            subtitle={`${moment(startDate).format(
              "dddd, MMMM Do YYYY"
            )} [${moment(startDate).format("LT")} - To: ${moment(
              endDate
            ).format("LT")}]`}
          />
          <Content>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Tit style={styles.content}>{departmentId}</Tit>
              <Text>Search</Text>
            </View>
          </Content>
        </Card>
      </View>
      <SafeAreaView>
        {attendanceList.length ? (
          <FlatList
            data={attendanceList}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
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
    fontSize: 14,
    fontWeight: "bold",
  },
  title: {
    color: WHITE,
    fontWeight: "bold",
  },
});
