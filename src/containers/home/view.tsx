import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SvgUri } from "react-native-svg";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import {
  PRY_COLOR,
  TEXT_COLOR,
  SEC_COLOR,
  WHITE,
} from "../../styles/colors";
import { Text, View, Image } from "react-native";
import AppLogo from '../../../assets/conclave.png';

const Tab = createBottomTabNavigator();

import MeetingContainer from "../meeting/index";
import ProfileContainer from "../profile/index";
import MyAttendancesContainer from "../myAttendances/index";
import CreateMeeting from "../meeting/CreateMeeting";
import TakeAttendanceView from "../attendance/viewTakeAttendance";
import MeetingAttendance from "../meeting/MeetingAttendance";

const MeetingsStack = createStackNavigator();
const MeetingsStackScreen = () => {
  return (
    <MeetingsStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}
    >
      <MeetingsStack.Screen name="Meeting" component={MeetingContainer} />
      <MeetingsStack.Screen name="CreateMeeting" component={CreateMeeting} />
      <MeetingsStack.Screen
        name="TakeAttendanceView"
        component={TakeAttendanceView}
      />
      <MeetingsStack.Screen
        name="MeetingAttendance"
        component={MeetingAttendance}
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
      })}
    >
      <ProfileStack.Screen name="MyProfile" component={ProfileContainer} />
    </ProfileStack.Navigator>
  );
};

const RecentStack = createStackNavigator();
const RecentStackScreen = () => {
  return (
    <RecentStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}
    >
      <RecentStack.Screen name="MyRecent" component={MyAttendancesContainer} />
    </RecentStack.Navigator>
  );
};

const LogoTitle = () => {
  return (
    // <SvgUri
    //   width="100%"
    //   height="100%"
    //   uri="https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/debian.svg"
    // />
    <Image
      //style={styles.logo}
      source={AppLogo}
    />
  );
}

const HomeView = () => {
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

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: WHITE,
        tabBarInactiveTintColor: SEC_COLOR,
        headerStyle: {
          // backgroundColor: PRY_COLOR,
          backgroundColor: "transparent",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        tabBarLabelStyle: {
          fontSize: 16,
        },
        tabBarActiveBackgroundColor: PRY_COLOR,
        tabBarStyle: {
          backgroundColor: "black",
        },
      })}
    >
      <Tab.Screen
        name="Meetings"
        component={MeetingsStackScreen}
        options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
      />
      <Tab.Screen
        name="Recent"
        component={RecentStackScreen}
        options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
      />
    </Tab.Navigator>
  );
};

export default HomeView;
