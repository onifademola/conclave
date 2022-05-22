import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { IconButton } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";
import { saveLoginData, reset } from "../redux/user/userSlice";
import { clearLoggedInUser } from "../consumers/storage";
import { PRY_COLOR, TEXT_COLOR, SEC_COLOR, WHITE } from "../styles/colors";
import { Text, View, Image } from "react-native";
import abi from "../../assets/abi.jpg";

const Tab = createBottomTabNavigator();

import MeetingContainer from "../containers/meeting/index";
import ProfileContainer from "../containers/profile/index";
import MyAttendancesContainer from "../containers/myAttendances/index";
import CreateMeeting from "../containers/meeting/CreateMeeting";
import TakeAttendanceView from "../containers/attendance/viewTakeAttendance";
import MeetingAttendance from "../containers/meeting/MeetingAttendance";
import AuthView from "../containers/auth/view";

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
        <Image style={{ maxWidth: 40, maxHeight: 30 }} source={abi} />
        <Text
          style={{
            fontFamily: "RobotoCondensed_300Light",
            color: "white",
            fontSize: 45,
            //fontWeight: "900",
          }}
        >
          Conclave
        </Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <IconButton
          color="white"
          icon="logout"
          size={28}
          onPress={async () => {
            await clearLoggedInUser().then(() => useDispatch(reset));
          }}
        />
      </View>
    </View>
  );
};

const AppNavigator = () => {
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

export default AppNavigator;
