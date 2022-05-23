import React from "react";
import { View, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Avatar, Headline, Text } from "react-native-paper";
import { useSelector } from "react-redux";
import {
  PRY_COLOR,
  SEC_COLOR,
  ACCENT,
  SEC_TEXT_COLOR,
  WHITE_FADED,
} from "../../styles/colors";
import { ExtractInitials } from "../../consumers/Utils";
import { meetingAttendance } from "../../mock/data";

const renderAvatar = ({ ImagePath }) => (
  <Avatar.Image
    size={120}
    style={{ backgroundColor: SEC_COLOR }}
    source={{
      uri: { ImagePath },
    }}
  />
);

const renderAvatarText = ({ Username }) => (
  <Avatar.Text
    size={120}
    label={ExtractInitials(Username)}
    color={PRY_COLOR}
    labelStyle={{ fontSize: 60 }}
    style={{ backgroundColor: SEC_COLOR }}
  />
);

const renderDetail = ({ DepartmentName, Username, SiteName }) => {
  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "flex-end",
        paddingTop: 5,
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
          justifyContent: "flex-start",
          paddingLeft: 5,
          alignItems: "flex-end",
        }}
      >
        <Text style={styles.text}>
          <Ionicons name="ios-mail-sharp" size={18} color={SEC_TEXT_COLOR} />
          {Username}
        </Text>
        <Text style={styles.text}>
          <Ionicons name="ios-people" size={18} color={SEC_TEXT_COLOR} />
          {DepartmentName.toLocaleUpperCase()}
        </Text>
        <Text style={styles.text}>
          <Ionicons name="ios-home-sharp" size={18} color={SEC_TEXT_COLOR} />
          {SiteName}
        </Text>
      </View>
    </View>
  );
};

const ProfileContent = ({ user }) => {
  const getName = () => {
    const { FirstName, LastName, Username } = user;
    if (FirstName && LastName) {
      return `${FirstName} ${LastName}`;
    } else {
      return Username;
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        {renderAvatarText(user)}
        {renderDetail(user)}
      </View>
      <Headline style={styles.profileName}>{getName()}</Headline>
    </View>
  );
};

const radiusRate = 90;

const styles = StyleSheet.create({
  container: {
    //flex: 0.5,
    borderTopLeftRadius: radiusRate,
    borderTopRightRadius: radiusRate,
    backgroundColor: ACCENT,
    justifyContent: "flex-start",
    //paddingBottom: DEVICE_HEIGHT * 0.05,
    paddingRight: 15,
    paddingLeft: 15,
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  profileName: {
    fontSize: 28,
    color: PRY_COLOR,
    paddingLeft: 20,
    paddingTop: 40,
    alignItems: "flex-end",
    textAlign: "right",
  },
  text: {
    color: SEC_TEXT_COLOR,
    marginBottom: 0.5,
    fontSize: 18,
  },
});

export default ProfileContent;
