import React from 'react';
import { View, StyleSheet } from "react-native";
import { Title, Avatar, Headline, Text } from "react-native-paper";
import { MARINE, AQUA_MARINE, MARINE_FADED } from '../../styles/colors';
import { meetingAttendance } from '../../mock/data';

const mUser = meetingAttendance[0];

const extractInitials = (name: string) => {
  if (!name) return '';
  const indexOfAt = name.indexOf('@');
  const subName = name.slice(indexOfAt + 1);
  return name.charAt(0).concat(subName.charAt(0)).toUpperCase();
};

const renderAvatar = () => (
  <Avatar.Image
    size={120}
    style={{ backgroundColor: AQUA_MARINE }}
    source={{
      uri: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png",
    }}
  />
);

const renderAvatarText = () => (
  <Avatar.Text
    size={120}
    label={extractInitials(mUser.attendee)}
    color={MARINE}
    labelStyle={{ fontWeight: "bold" }}
    style={{ backgroundColor: AQUA_MARINE }}
  />
);

const renderDetail = () => {
  return (
    <View style={{ flexDirection: 'column', justifyContent: 'flex-end', paddingLeft: 5 }}>
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
    backgroundColor: MARINE_FADED,
    justifyContent: "flex-end",
    padding: 15,
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  profileName: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 40,
  },
  text: {
    color: "white",
    marginBottom: .5,
    fontSize: 18,
  },
});

export default ProfileContent