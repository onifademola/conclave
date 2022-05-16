import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
// import { SvgUri } from "react-native-svg";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  MARINE,
  TEXT_COLOR,
  AQUA_MARINE,
  WHITE_FADED,
} from "../../styles/colors";

const Tab = createBottomTabNavigator();

import MeetingContainer from "../meeting/index";
import ProfileContainer from "../profile/index";
import MyAttendancesContainer from "../myAttendances/index";

// const LogoTitle = () => {
//   return (
//     <SvgUri
//       width="100%"
//       height="100%"
//       uri="https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/debian.svg"
//     />
//   );
// }

const HomeView = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          // switch (route.name) {
          //   case "Meetings":
          //     iconName = focused ? "alarm-multiple" : "alarm-multiple";
          //     return;
          //   case "Profile":
          //     iconName = focused ? "account" : "account";
          //     return;
          //   case "Recent":
          //     iconName = focused ? "ios-hourglass" : "ios-hourglass-outline";
          //     return;
          //   default:
          //     return;
          // }
          
          if (route.name === "Meetings") {
            iconName = focused
              ? "timer"
              : "timer-outline";
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
        tabBarActiveTintColor: TEXT_COLOR,
        tabBarInactiveTintColor: AQUA_MARINE,
        headerStyle: {
          backgroundColor: MARINE,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        tabBarLabelStyle: {
          fontSize: 16,
        },
        tabBarActiveBackgroundColor: WHITE_FADED,
      })}
    >
      <Tab.Screen
        name="Meetings"
        component={MeetingContainer}
        // options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileContainer}
        // options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
      />
      <Tab.Screen
        name="Recent"
        component={MyAttendancesContainer}
        // options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
      />
    </Tab.Navigator>
  );
};

export default HomeView;
