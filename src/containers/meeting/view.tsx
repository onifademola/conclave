import * as React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FutureMeetingsContainer from "./FutureMeetingsContainer";
import PastMeetingsContainer from "./PastMeetingsContainer";
import CancelledMeetingsContainer from "./CancelledMeetingsContainer";
import {
  PRY_COLOR,
  SEC_COLOR,
  SEC_TEXT_COLOR,
} from "../../styles/colors";

const Tab = createMaterialTopTabNavigator();

const MeetingView = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 18 },
        tabBarStyle: { backgroundColor: SEC_TEXT_COLOR },
        tabBarInactiveTintColor: PRY_COLOR,
        tabBarActiveTintColor: SEC_COLOR,
      }}
    >
      <Tab.Screen
        name="UpcomingMeetings"
        component={FutureMeetingsContainer}
        options={{ title: "Upcoming" }}
      />
      <Tab.Screen
        name="CompletedMeetings"
        component={PastMeetingsContainer}
        options={{ title: "Completed" }}
      />
      <Tab.Screen
        name="CancelledMeetings"
        component={CancelledMeetingsContainer}
        options={{ title: "Cancelled" }}
      />
    </Tab.Navigator>
  );
};

export default MeetingView;
