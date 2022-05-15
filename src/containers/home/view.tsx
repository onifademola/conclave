import React from "react";
import { BottomNavigation, Text } from "react-native-paper";

import MeetingContainer from "../meeting/index";
import ProfileContainer from "../profile/index";
import MyAttendancesContainer from "../myAttendances/index";

const HomeView = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "meeting", title: "Meeting", icon: "alarm-multiple" },
    { key: "profile", title: "Profile", icon: "account" },
    { key: "recents", title: "Recents", icon: "history" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    meeting: MeetingContainer,
    profile: ProfileContainer,
    recents: MyAttendancesContainer,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default HomeView;
