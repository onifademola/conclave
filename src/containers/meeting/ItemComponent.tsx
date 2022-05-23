import React from "react";
import { View, StyleSheet } from "react-native";
import {
  Card,
  IconButton,
  Title as Tit,
  Paragraph,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { ACCENT, SEC_TEXT_COLOR } from "../../styles/colors";
import ModalAlertComponent, {
  ModalType,
} from "../../common/ModalAlertComponent";
import MeetingStatus, { MeetingStatusProp, MeetingStatusType } from "../../common/MeetingStatus";

interface MeetingProp {
  Id: string;
  MeetingName: string;
  StartDate: string;
  EndDate: string;
  detail: string;
  departmentId: string;
  siteId: string;
  createdBy: string;
}

const { Title, Content } = Card;

const showBusy = () => {
  // return <BusyComponent />;
  return (
    <ModalAlertComponent
      type={ModalType.success}
      message="Happy! It went well."
    />
  );
};

const ItemComponent = ({ meeting }) => {
  if (!meeting) return null;
  const navigation = useNavigation();
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
    LateAfter
  } = meeting;

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
        onPress: () => { // should only be able to this for a meeting that is pending
          console.log("raise a modal to mark done or cancelled")
        },
      };
      return <MeetingStatus meetingStatus={meeting} />;
    }
  }

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Title
          titleStyle={styles.title}
          title={getMeetingStatus()}
          subtitleStyle={styles.content}
          subtitle={Department}
          left={(props) => (
            <IconButton
              color={SEC_TEXT_COLOR}
              icon="qrcode-scan"
              size={35}
              onPress={() =>
                navigation.navigate("TakeAttendanceView", { meeting })
              }
            />
          )}
          right={(props) => (
            <View style={{ flexDirection: "row" }}>
              <IconButton
                {...props}
                color={SEC_TEXT_COLOR}
                icon="calendar-edit"
                size={35}
                onPress={() =>
                  //navigation.navigate("MeetingAttendance", { meeting })
                  console.log("edit this item")
                }
              />
              <IconButton
                {...props}
                color={SEC_TEXT_COLOR}
                icon="order-alphabetical-ascending"
                size={35}
                onPress={() =>
                  navigation.navigate("MeetingAttendance", { meeting })
                }
              />
            </View>
          )}
        />
        <Content>
          <View>
            <Tit style={{ ...styles.content, fontSize: 28 }}>{MeetingName}</Tit>
            <Tit
              style={{ ...styles.content, fontSize: 15, fontWeight: "800" }}
            >{`${moment(StartDate).format("dddd, MMMM DD, YYYY")} || ${moment(
              StartDate
            ).format("LT")} - ${moment(EndDate).format("LT")}`}</Tit>
            <Paragraph style={styles.content}>{Detail}</Paragraph>
          </View>
        </Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 15,
    padding: 2,
  },
  card: {
    backgroundColor: ACCENT,
  },
  content: {
    color: SEC_TEXT_COLOR,
    fontSize: 16,
  },
  title: {
    color: SEC_TEXT_COLOR,
    fontSize: 10,
    // fontWeight: "900"
  },
});

export default ItemComponent;
