import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Avatar } from "react-native-paper";
import moment from "moment";
import {
  PRY_COLOR,
  SEC_COLOR,
} from "../../styles/colors";
import { ExtractInitials } from '../../consumers/Utils';
import { ApiRoutes } from '../../consumers/api-routes';

const avatarSize = 50;
const renderAvatarText = (Email: string) => (
  <Avatar.Text
    size={avatarSize}
    label={ExtractInitials(Email)}
    color={PRY_COLOR}
    labelStyle={{
      fontFamily: "RobotoCondensed_400Regular",
      fontSize: 28,
    }}
    style={{ backgroundColor: SEC_COLOR }}
  />
);

const renderAvatar = (uri: string) => (
  <Avatar.Image
    size={avatarSize}
    style={{ backgroundColor: SEC_COLOR }}
    source={{ uri }}
  />
);

const AdminAttendanceComponent = ({ item }) => {  
  const { FirstName, LastName, Email, ArrivalTime, ImagePath, Status } = item;
  const imageUri = `${ApiRoutes.imageUriPrefix}/${ImagePath}`;
  const [imageIsValid, setImageIsValid] = useState(false);

  useEffect(() => {
    fetch(imageUri).then((res) => {
      setImageIsValid(res.status === 200);
    });
  }, []);

  const getName = () => {
    if (FirstName && LastName)
      return `${FirstName} ${LastName} (${Email})`;
    return Email;
  }

  return (
    <View style={styles.row}>
      {imageIsValid ? renderAvatar(imageUri) : renderAvatarText(Email)}      
      <View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{getName()}</Text>
        </View>
        <View style={styles.msgContainer}>
          <Text style={styles.msgTxt}>
            Arrival Time:{" "}
            {moment(ArrivalTime).isValid()
              ? moment(ArrivalTime).format("LT")
              : null}{" "}
          </Text>
          <Text style={styles.msgTxt}>({Status})</Text>
        </View>
      </View>
    </View>
  );
}

export default AdminAttendanceComponent;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderBottomWidth: 0.5,
    padding: 10,
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    // width: 280,
  },
  nameTxt: {
    marginLeft: 15,
    fontSize: 18,
    fontFamily: "RobotoCondensed_400Regular",
  },
  mblTxt: {
    fontSize: 13,
    fontFamily: "RobotoCondensed_400Regular",
  },
  msgContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  msgTxt: {
    fontSize: 15,
    marginLeft: 15,
    fontFamily: "RobotoCondensed_400Regular",
  },
});
