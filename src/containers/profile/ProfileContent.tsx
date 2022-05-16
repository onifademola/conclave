import React from "react";
import { View, StyleSheet } from "react-native";
import { Title, Avatar, Headline, Text } from "react-native-paper";
import {
  PRY_COLOR,
  SEC_COLOR,
  ACCENT,
  SEC_TEXT_COLOR,
} from "../../styles/colors";
import { meetingAttendance } from "../../mock/data";

const mUser = meetingAttendance[0];

const extractInitials = (name: string) => {
  if (!name) return "";
  const indexOfAt = name.indexOf("@");
  const subName = name.slice(indexOfAt + 1);
  return name.charAt(0).concat(subName.charAt(0)).toUpperCase();
};

const renderAvatar = () => (
  <Avatar.Image
    size={120}
    style={{ backgroundColor: SEC_COLOR }}
    source={{
      uri: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png",
    }}
  />
);

const renderAvatarText = () => (
  <Avatar.Text
    size={120}
    label={extractInitials(mUser.attendee)}
    color={PRY_COLOR}
    labelStyle={{ fontWeight: "bold" }}
    style={{ backgroundColor: SEC_COLOR }}
  />
);

const renderDetail = () => {
  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "flex-end",
        paddingLeft: 5,
      }}
    >
      <Text style={styles.text}>Email: </Text>
      <Text style={styles.text}>DEPARTMENT: Solutions</Text>
      <Text style={styles.text}>SITE: Onitsha</Text>
    </View>
  );
};

const ProfileContent = ({ user }) => {
  return (
    <View style={styles.container}>
      <Headline style={styles.profileName}>Joan Erukpe Bro. Lasisi</Headline>
      <View style={styles.subContainer}>
        {renderAvatarText()}
        {renderDetail()}
      </View>
    </View>
  );
};

const radiusRate = 90;

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    borderTopLeftRadius: radiusRate,
    borderTopRightRadius: radiusRate,
    backgroundColor: ACCENT,
    justifyContent: "flex-end",
    padding: 15,
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  profileName: {
    fontSize: 30,
    color: SEC_TEXT_COLOR,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 40,
  },
  text: {
    color: SEC_TEXT_COLOR,
    marginBottom: 0.5,
    fontSize: 18,
  },
});

export default ProfileContent;
