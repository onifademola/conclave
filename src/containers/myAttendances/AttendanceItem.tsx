import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import moment from 'moment';
import MeetingStatus, {
  MeetingStatusProp,
  MeetingStatusType,
} from "../../common/MeetingStatus";

const AttendanceItem = ({item}) => {
  const { 
    ArrivalTime,
    MeetingName,
    StartDate,
    Status,
    Done,
    Cancelled,
    LateAfter,
  } = item;

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

  return (
    <View style={styles.row}>
      <View>
        <View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>{MeetingName}</Text>
            <View style={styles.msgContainer}>
              <Text style={styles.msgTxt}>
                {moment(StartDate).isValid()
                  ? `${moment(StartDate).format(
                      "ddd, MMM Do YYYY"
                    )} by ${moment(StartDate).format("LT")}`
                  : null}{" "}
              </Text>
              <Text style={styles.msgTxt}>(Late After: {LateAfter}mins)</Text>
            </View>
          </View>
        </View>
        <View style={styles.msgContainer}>
          <Text style={styles.msgTxt}>
            Arrival Time:{" "}
            {moment(ArrivalTime).isValid()
              ? moment(ArrivalTime).format("LT")
              : null}{" "}
          </Text>
          <Text style={styles.msgTxt}>({Status})</Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "flex-end",
          maxHeight: "40%",
          padding: 10,
        }}
      >
        {getMeetingStatus()}
      </View>
    </View>
  );
}

export default AttendanceItem;

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderBottomWidth: 0.5,
    padding: 10,
  },
  nameContainer: {
    flex: 0.5,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  nameTxt: {
    marginLeft: 15,
    fontSize: 20,
    fontFamily: "RobotoCondensed_400Regular",
    color: "white",
  },
  mblTxt: {
    fontSize: 13,
    fontFamily: "RobotoCondensed_400Regular",
  },
  msgContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  msgTxt: {
    fontSize: 18,
    marginLeft: 15,
    fontFamily: "RobotoCondensed_400Regular",
    color: "black",
  },
});
