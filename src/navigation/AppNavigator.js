import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, View, Image, StyleSheet } from "react-native";
import { PRY_COLOR, SEC_COLOR, WHITE, ACCENT } from "../styles/colors";
import abi from "../../assets/abi.jpg";

import MeetingContainer from "../containers/meeting/index";
import ProfileContainer from "../containers/profile/index";
import MyAttendancesContainer from "../containers/myAttendances/index";
import CreateMeeting from "../containers/meeting/CreateMeeting";
import TakeAttendanceView from "../containers/attendance/viewTakeAttendance";
import MeetingAttendance from "../containers/meeting/MeetingAttendance";
import {
  SMALL_DEVICE,
  MEDIUM_DEVICE,
  LARGE_DEVICE,
} from "../constants/device-dimensions";

const Tab = createBottomTabNavigator();

const commonHeaderStyle = {
  backgroundColor: ACCENT,
};

const commonHeaderTitleStyle = {
  fontSize: 25,
};

const MeetingsStack = createStackNavigator();
const MeetingsStackScreen = () => {
  return (
    <MeetingsStack.Navigator
      screenOptions={() => ({
        headerShown: true,
        headerStyle: commonHeaderStyle,
        headerShadowVisible: true,
        headerBackTitleStyle: commonHeaderTitleStyle,
      })}
    >
      <MeetingsStack.Screen
        name="Meeting"
        component={MeetingContainer}
        options={{ title: "MEETINGS", headerShown: false }}
      />
      <MeetingsStack.Screen
        name="CreateMeeting"
        component={CreateMeeting}
        options={{ title: "NEW MEETING" }}
      />
      <MeetingsStack.Screen
        name="TakeAttendanceView"
        component={TakeAttendanceView}
        options={{ title: "TAKE ATTENDANCE" }}
      />
      <MeetingsStack.Screen
        name="MeetingAttendance"
        component={MeetingAttendance}
        options={{ title: "MEETING ATTENDANCE" }}
      />
    </MeetingsStack.Navigator>
  );
};

const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={() => ({
        headerShown: false,
        headerStyle: commonHeaderStyle,
        headerBackTitleStyle: commonHeaderTitleStyle,
      })}
    >
      <ProfileStack.Screen
        name="MyProfile"
        component={ProfileContainer}
        options={{ title: "PROFILE" }}
      />
    </ProfileStack.Navigator>
  );
};

const RecentStack = createStackNavigator();
const RecentStackScreen = () => {
  return (
    <RecentStack.Navigator
      screenOptions={() => ({
        headerShown: true,
        headerStyle: commonHeaderStyle,
        headerBackTitleStyle: commonHeaderTitleStyle,
      })}
    >
      <RecentStack.Screen
        name="MyRecent"
        component={MyAttendancesContainer}
        options={{ title: "MY ATTENDANCES" }}
      />
    </RecentStack.Navigator>
  );
};

const LogoTitle = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "stretch",
        alignContent: "space-between",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Image style={styles.imageStyle} source={abi} />
        <Text
          style={{
            fontFamily: "RobotoCondensed_300Light",
            color: "white",
            fontSize: SMALL_DEVICE
              ? 20
              : MEDIUM_DEVICE
              ? 30
              : LARGE_DEVICE
              ? 30
              : 40,
            // fontSize: {SMALL_DEVICE ? 20 : MEDIUM_DEVICE ? 40 : LARGE_DEVICE ? 50 : 30},
            //fontWeight: "900",
          }}
        >
          Conclave
        </Text>
      </View>
    </View>
  );
};

const AppNavigator = ({ isUserAdmin }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Meetings") {
            iconName = focused ? "timer" : "timer-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Recent") {
            iconName = focused
              ? "play-back-circle"
              : "play-back-circle-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: WHITE,
        tabBarInactiveTintColor: SEC_COLOR,
        headerStyle: {
          backgroundColor: "black",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
          fontFamily: "RobotoCondensed_400Regular",
        },
        tabBarLabelStyle: {
          fontSize: 18,
          fontFamily: "RobotoCondensed_400Regular",
        },
        tabBarActiveBackgroundColor: PRY_COLOR,
        tabBarStyle: {
          backgroundColor: "black",
          fontFamily: "RobotoCondensed_400Regular",
        },
      })}
    >
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
        }}
      />
      {isUserAdmin ? (
        <Tab.Screen
          name="Meetings"
          component={MeetingsStackScreen}
          options={{
            // headerShown: false,
            headerTitle: (props) => <LogoTitle {...props} />,
          }}
        />
      ) : null}
      <Tab.Screen
        name="Recent"
        component={RecentStackScreen}
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;

const bigDeviceImage = {
  maxWidth: 40,
  maxHeight: 40,
};

const smallDeviceImage = {
  maxWidth: 30,
  maxHeight: 30,
};

const medimumDeviceImage = {
  maxWidth: 35,
  maxHeight: 35,
};

const styles = StyleSheet.create({
  imageStyle: SMALL_DEVICE
    ? smallDeviceImage
    : MEDIUM_DEVICE
    ? medimumDeviceImage
    : LARGE_DEVICE
    ? bigDeviceImage
    : medimumDeviceImage,
});
