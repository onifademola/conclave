import React from "react";
import { View, StyleSheet } from "react-native";
import {
  Avatar,
  Card,
  IconButton,
  Title as Tit,
  Paragraph,
} from "react-native-paper";
import { ACCENT, SEC_TEXT_COLOR } from "../../styles/colors";

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

const ItemComponent = ({ meeting }) => {
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

  if (!meeting) return null;

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
              onPress={() => console.log("scan pressed")}
            />
          )}
          right={(props) => (
            <IconButton
              {...props}
              color={SEC_TEXT_COLOR}
              // icon="arrow-right-drop-circle-outline"
              icon="order-alphabetical-ascending"
              size={35}
              onPress={() => console.log("nav-to list pressed")}
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