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
import { SMALL_DEVICE, MEDIUM_DEVICE, LARGE_DEVICE, LARGER_DEVICE } from "../../constants/device-dimensions";

const renderAvatar = (uri: string) => (
  <Avatar.Image
    size={SMALL_DEVICE ? 70 : LARGE_DEVICE ? 100 : LARGER_DEVICE ? 120 : 80}
    style={{ backgroundColor: SEC_COLOR }}
    source={{ uri }}
  />
);

const renderAvatarText = ({ Username }) => (
  <Avatar.Text
    size={SMALL_DEVICE ? 50 : LARGE_DEVICE ? 100 : LARGER_DEVICE ? 120 : 80}
    label={ExtractInitials(Username)}
    color={PRY_COLOR}
    labelStyle={{ fontSize: 60 }}
    style={{ backgroundColor: SEC_COLOR }}
  />
);

const renderDetail1 = ({ DepartmentName, Username, SiteName }) => {
  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "flex-start",
        paddingTop: 5,
      }}
    >
      {/* <Ionicons
        name="ios-information-circle-sharp"
        size={65}
        color={SEC_TEXT_COLOR}
      /> */}
      <View
        style={{
          flexDirection: "column",
          justifyContent: "flex-start",
          paddingLeft: 5,
          alignItems: "flex-start",
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

const renderDetail = ({ DepartmentName, Username, SiteName }) => {
  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "flex-start",
        paddingTop: 5,
        paddingLeft: 5,
        alignItems: "flex-end",
      }}
    >
      {SMALL_DEVICE ? null : (
        <Ionicons
          name="ios-information-circle-sharp"
          size={SMALL_DEVICE ? 18 : MEDIUM_DEVICE ? 45 : LARGE_DEVICE ? 60 : 80}
          color={SEC_TEXT_COLOR}
        />
      )}
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
          </View>
          {renderDetail(user)}
          {SMALL_DEVICE ? null : (
            <Headline style={styles.profileName}>{getName()}</Headline>
          )}
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
    paddingRight: "5%",
    paddingLeft: "5%",
    marginTop: "15%",
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    //width: "70%",
  },
  profileName: {
    fontSize: SMALL_DEVICE ? 20 : MEDIUM_DEVICE ? 24 : LARGE_DEVICE ? 28 : 20,
    color: PRY_COLOR,
    paddingLeft: 20,
    alignItems: "flex-start",
    textAlign: "right",
  },
  text: {
    color: SEC_TEXT_COLOR,
    marginBottom: 0.5,
    fontSize: 18,
  },
});

export default ProfileContent;
