import React from "react";
import { View, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Title, Avatar, Headline, Text } from "react-native-paper";
import {
  PRY_COLOR,
  SEC_COLOR,
  ACCENT,
  SEC_TEXT_COLOR,
  WHITE_FADED
} from "../../styles/colors";
import { ExtractInitials } from "../../consumers/Utils";
import { meetingAttendance } from "../../mock/data";

const mUser = meetingAttendance[0];

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
    label={ExtractInitials(mUser.email)}
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
        alignItems: "flex-end",
      }}
    >
      <Ionicons
        name="ios-information-circle-sharp"
        size={65}
        color={SEC_TEXT_COLOR}
      />
      <View
        style={{
          flexDirection: "column",
          justifyContent: "flex-end",
          paddingLeft: 5,
          alignItems: "flex-start",
        }}
      >
        <Text style={styles.text}>
          <Ionicons name="ios-mail-sharp" size={18} color={SEC_TEXT_COLOR} />
          {" ade@we.com"}
        </Text>
        <Text style={styles.text}>
          <Ionicons name="ios-people" size={18} color={SEC_TEXT_COLOR} />
          {" SOLUTIONS"}
        </Text>
        <Text style={styles.text}>
          <Ionicons name="ios-home-sharp" size={18} color={SEC_TEXT_COLOR} />
          {" Onitsha"}
        </Text>
      </View>
    </View>
  );
};

const ProfileContent = ({ user }) => {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        {renderAvatarText()}
        {renderDetail()}
      </View>
      <Headline style={styles.profileName}>Joan Erukpe Bro. Lasisi</Headline>
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
    justifyContent: "space-between",
  },
  profileName: {
    fontSize: 24,
    color: PRY_COLOR,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 40,
    alignItems: "flex-end",
    textAlign: "right",
  },
  text: {
    color: SEC_TEXT_COLOR,
    marginBottom: 0.5,
    fontSize: 18,
    fontWeight: "800",
  },
});

export default ProfileContent;
