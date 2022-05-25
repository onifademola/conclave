import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Card, IconButton, Title as Tit, Paragraph } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as Animatable from "react-native-animatable";
import { ACCENT, SEC_TEXT_COLOR } from "../../styles/colors";
import MeetingStatus, {
  MeetingStatusProp,
  MeetingStatusType,
} from "../../common/MeetingStatus";
import { prodUrl } from "../../consumers/http";

const { Title, Content } = Card;

const ItemComponent = (prop) => {
  const { UpdateMeeting, DeleteMeeting, meeting } = prop;
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
  } = meeting;

  const [animation, setAnimation] = useState("");

  const iconSize = 30;

  const deleteAlert = () =>
    Alert.alert(
      "CANCEL/DELETE",
      "Do you want to cancel or delete this meeting?\n(You can only do this if the meeting has not started, or has not been done). \n\nChoose GO BACK if you don't want to continue.",
      [
        {
          text: "Go back",
          onPress: () => console.log("Ask me later pressed"),
        },
        {
          text: "CANCEL",
          onPress: async () => {
            const cancellingMeeting = {
              Cancelled: true,
              Id: Id,
              MeetingName: MeetingName,
              Detail: Detail,
              StartDate: StartDate,
              EndDate: EndDate,
              DepartmentId: DepartmentId,
              SiteId: SiteId,
              CreatedBy: CreatedBy,
              Done: Done,
              LateAfter: LateAfter,
            };
            await UpdateMeeting(cancellingMeeting);
          },
          style: "cancel",
        },
        { text: "DELETE", onPress: async () => {
          await DeleteMeeting(Id);
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
            />
          )}
          right={(props) => (
            <View style={{ flexDirection: "row" }}>
              <IconButton
                {...props}
                color={SEC_TEXT_COLOR}
                icon="delete-clock"
                size={iconSize}
                onPress={() => deleteAlert()}
              />
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
