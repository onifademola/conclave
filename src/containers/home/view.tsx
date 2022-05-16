import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
// import { SvgUri } from "react-native-svg";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  PRY_COLOR,
  TEXT_COLOR,
  SEC_COLOR,
  WHITE,
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
          backgroundColor: PRY_COLOR,
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
