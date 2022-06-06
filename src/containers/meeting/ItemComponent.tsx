import React, { useState } from "react";
import { View, StyleSheet, Alert, Text } from "react-native";
import {
  Card,
  IconButton,
  Title as Tit,
  Paragraph,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as Animatable from "react-native-animatable";
import Toast from "react-native-simple-toast";
import { ACCENT, SEC_TEXT_COLOR } from "../../styles/colors";
import MeetingStatus, {
  MeetingStatusProp,
  MeetingStatusType,
} from "../../common/MeetingStatus";
import { prodUrl } from "../../consumers/http";
import TinyBusyComponent from "../../common/TinyBusyComponent";
import { isMeetingValidForAttendance } from "../../consumers/DateHelper";

const { Title, Content } = Card;

const ItemComponent = (prop) => {
  const { UpdateMeeting, DeleteMeeting, meeting, renderModal } =
    prop;

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
    DepartmentId,
    SiteId,
    Done,
    Cancelled,
    LateAfter,
    RecurringId,
  } = meeting;

  const canDoAttendance = isMeetingValidForAttendance(EndDate, new Date());
  const [animation, setAnimation] = useState("");
  const [isPageLoading, setIsPageLoading] = useState(false); 
  const iconSize = 30;

  const deleteAlert = () =>
    Alert.alert(
      "CANCEL/DELETE",
      "Do you want to cancel or delete this meeting?\n(You can only do this if the meeting has not started, or has not been done). \n\nChoose GO BACK if you don't want to continue.",
      [
        {
          text: "Go back",
          onPress: () => console.log("All operations cancelled."),
        },
        {
          text: "CANCEL",
          onPress: async () => {
            setIsPageLoading(true);
            const cancellingMeeting = { ...meeting, Cancelled: true };
            await UpdateMeeting(cancellingMeeting)
              .then((res) => {
                setIsPageLoading(false);
                Toast.showWithGravity(
                  "Meeting cancelled.",
                  Toast.LONG,
                  Toast.TOP
                );
              })
              .catch(() => {
                setIsPageLoading(false);
                Toast.showWithGravity(
                  "Meeting cancelled.",
                  Toast.LONG,
                  Toast.TOP
                );
              });
          },
          style: "cancel",
        },
        { text: "DELETE", onPress: async () => {
          setIsPageLoading(true);
          await DeleteMeeting(Id)
            .then((res) => {
              setIsPageLoading(false);
              Toast.showWithGravity(
                "Meeting deleted.",
                Toast.LONG,
                Toast.TOP
              );
            })
            .catch(() => {
              setIsPageLoading(false);
              Toast.showWithGravity("Meeting deleted.", Toast.LONG, Toast.TOP);
            });
        }},
      ]
    );

  const downloadAttendance = async () => {
    const remoteUri = `${prodUrl}/meeting/attendance/${Id}/download`;
    const fileUri: string = `${FileSystem.documentDirectory}${MeetingName}.xlsx`;
    await FileSystem.downloadAsync(remoteUri, fileUri)
      .then(async () => {
        setAnimation("");
        await Sharing.shareAsync(fileUri);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
              size={iconSize}
              onPress={() =>
                navigation.navigate("TakeAttendanceView", { meeting })
              }
              disabled={!canDoAttendance}
            />
          )}
          right={(props) => (
            <View style={{ flexDirection: "row" }}>
              {Done || Cancelled ? null : (
                <IconButton
                  {...props}
                  color={SEC_TEXT_COLOR}
                  icon="delete-clock"
                  size={iconSize}
                  // onPress={() =>
                  //   RecurringId ? renderModal(meeting) : deleteAlert()
                  // }
                  onPress={() => renderModal(meeting)}
                  disabled={Done || Cancelled}
                />
              )}
              <Animatable.View
                animation={animation}
                iterationCount={10}
                direction="alternate"
              >
                <IconButton
                  {...props}
                  color={SEC_TEXT_COLOR}
                  icon="file-download"
                  size={iconSize}
                  onPress={() => {
                    setAnimation("slideInDown");
                    downloadAttendance();
                  }}
                />
              </Animatable.View>
              <IconButton
                {...props}
                color={SEC_TEXT_COLOR}
                icon="order-alphabetical-ascending"
                size={iconSize}
                onPress={() =>
                  navigation.navigate("MeetingAttendance", { meeting })
                }
              />
            </View>
          )}
        />
        <Content>
          {isPageLoading ? (
            <TinyBusyComponent />
          ) : (
            <View>
              <Tit style={{ ...styles.content, fontSize: 28 }}>
                {MeetingName}
              </Tit>
              {RecurringId && RecurringId.length ? (
                <Text style={{ fontSize: 10, padding: 0, fontWeight: "bold" }}>
                  RECURRING MEETING
                </Text>
              ) : null}
              <Tit
                style={{ ...styles.content, fontSize: 15, fontWeight: "800" }}
              >{`${moment(StartDate).format("dddd, MMMM DD, YYYY")} || ${moment(
                StartDate
              ).format("LT")} - ${moment(EndDate).format("LT")}`}</Tit>
              <Paragraph style={styles.content}>{Detail}</Paragraph>
            </View>
          )}
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
