import React from "react";
import { View, StyleSheet } from "react-native";
import {
  Card,
  IconButton,
  Title as Tit,
  Paragraph,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { ACCENT, SEC_TEXT_COLOR } from "../../styles/colors";
import ModalAlertComponent, {
  ModalType,
} from "../../common/ModalAlertComponent";

interface Meeting {
  id: string;
  meetingName: string;
  startDate: string;
  endDate: string;
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
    id,
    meetingName,
    startDate,
    endDate,
    detail,
    createdBy,
    departmentId,
    siteId,
  } = meeting;

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Title
          titleStyle={styles.title}
          title={meetingName}
          subtitleStyle={styles.content}
          subtitle={`From: ${startDate} - To: ${endDate}`}
          left={(props) => (
            <IconButton
              color={SEC_TEXT_COLOR}
              icon="qrcode-scan"
              size={30}
              onPress={() => navigation.navigate("TakeAttendanceView")}
            />
          )}
          right={(props) => (
            <IconButton
              {...props}
              color={SEC_TEXT_COLOR}
              // icon="arrow-right-drop-circle-outline"
              icon="order-alphabetical-ascending"
              size={35}
              onPress={() => navigation.navigate("MeetingAttendance", { meeting })}
            />
          )}
        />
        <Content>
          <View>
            <Tit style={styles.content}>{departmentId}</Tit>
            <Paragraph style={styles.content}>{detail}</Paragraph>
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
  },
  title: {
    color: SEC_TEXT_COLOR,
    fontWeight: "bold",
  },
});

export default ItemComponent;
