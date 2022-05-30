import * as React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FutureMeetingsContainer from "./FutureMeetingsContainer";
import PastMeetingsContainer from "./PastMeetingsContainer";
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
        name="FutureMeetings"
        component={FutureMeetingsContainer}
        options={{ title: "Future Meetings" }}
      />
      <Tab.Screen
        name="CompletedMeetings"
        component={PastMeetingsContainer}
        options={{ title: "Completed/Cancelled" }}
      />
    </Tab.Navigator>
  );
};

export default MeetingView;
