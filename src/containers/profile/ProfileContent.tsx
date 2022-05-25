import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Avatar, Headline, Text } from "react-native-paper";
import {
  PRY_COLOR,
  SEC_COLOR,
  ACCENT,
  SEC_TEXT_COLOR,
} from "../../styles/colors";
import { ExtractInitials } from "../../consumers/Utils";
import { ApiRoutes } from "../../consumers/api-routes";

const renderAvatar = (uri: string) => (
  <Avatar.Image
    size={120}
    style={{ backgroundColor: SEC_COLOR }}
    source={{ uri }}
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
        <View style={{ flexDirection: "row" }}>
          <Text style={{ flexWrap: "wrap", ...styles.text }}>
            <Ionicons name="ios-mail-sharp" size={18} color={SEC_TEXT_COLOR} />
            {Username}
          </Text>
        </View>
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
  const { FirstName, LastName, Username, ImagePath } = user;
  const imageUri = `${ApiRoutes.imageUriPrefix}/${ImagePath}`;
  const [isLoading, setIsLoading] = useState(true);
  const [imageIsValid, setImageIsValid] = useState(true);

  useEffect(() => {
    fetch(imageUri).then((res) => {
      setImageIsValid(res.status === 200);
      setIsLoading(false);
    });
  }, []);

  const getName = () => {    
    if (FirstName && LastName) {
      return `${FirstName} ${LastName}`;
    } else {
      return Username;
    }
  };

  if (isLoading) return <View></View>;

  return (
    <View style={styles.container}>
      {isLoading ? (
        <></>
      ) : (
        <>
          <View style={styles.subContainer}>
            {imageIsValid ? renderAvatar(imageUri) : renderAvatarText(user)}
            {renderDetail(user)}
          </View>
          <Headline style={styles.profileName}>{getName()}</Headline>
        </>
      )}
    </View>
  );
};

const radiusRate = 90;

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: radiusRate,
    borderTopRightRadius: radiusRate,
    backgroundColor: ACCENT,
    justifyContent: "flex-start",
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
