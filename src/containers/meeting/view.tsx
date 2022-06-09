import React, { useState, useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useSelector } from "react-redux";
import moment from "moment";
import { LinearGradient } from "expo-linear-gradient";
// import FutureMeetingsContainer from "./FutureMeetingsContainer";
// import PastMeetingsContainer from "./PastMeetingsContainer";
// import CancelledMeetingsContainer from "./CancelledMeetingsContainer";
import {
  PRY_COLOR,
  SEC_COLOR,
  SEC_TEXT_COLOR,
  LINEAR_GRADIENT_COLORS,
} from "../../styles/colors";
import commonStyles from "../../styles/common";
import BusyComponent from "../../common/BusyComponent";
import { HttpGet } from "../../consumers/http";
import { ApiRoutes } from "../../consumers/api-routes";
import FutureMeetings from "./FutureMeetings";
import CancelledMeetings from "./CancelledMeetings";
import PastMeetings from "./PastMeetings";

const Tab = createMaterialTopTabNavigator();

const MeetingView: React.FC = () => {
  const appUser = useSelector((state) => state.user.loggedInUser);
  const [loggedInUser, setLoggedInUser] = useState(appUser);
  const [isLoading, setIsLoading] = useState(true);
  const [futureMeetings, setFutureMeetings] = useState([]);
  const [pastMeetings, setPastMeetings] = useState([]);
  const [cancelledMeetings, setCanclledMeetings] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetchDepartments();
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    const url = `${ApiRoutes.getMeetings}/${loggedInUser.SiteId}`;
    await HttpGet(loggedInUser.Token, url)
      .then((res) => {
        const sortedMeetings = res.data.sort((a: any, b: any) => {
          return a.StartDate < b.StartDate
            ? -1
            : a.StartDate > b.StartDate
            ? 1
            : 0;
        });
        saveFutureMeetings([...sortedMeetings]);
        saveCancelledMeetings([...sortedMeetings]);
        savePastMeetings([...sortedMeetings]);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const fetchDepartments = async () => {
    await HttpGet(loggedInUser.Token, ApiRoutes.getDepartments)
      .then((res) => {
        const result = res.data.map((item) => ({
          key: item.id,
          label: item.name,
        }));
        setDepartments(
          result.sort((a: any, b: any) => {
            return a.label < b.label ? -1 : a.label > b.label ? 1 : 0;
          })
        );
        setIsLoading(false);
      })
      .catch((err) => {});
  };

  const saveFutureMeetings = (meetings) => {
    const filterdMeetings = meetings.filter((f) => {
      if (f.Done == null && f.Cancelled == null) {
        return f;
      }
    });
    const fMeetings = filterdMeetings.filter((f) => {
      return moment(f.StartDate).isAfter(moment());
    });
    setFutureMeetings(fMeetings);
  };

  const saveCancelledMeetings = (meetings) => {
    const filterdMeetings = meetings
      .filter((f) => f.Cancelled)
      .sort((a: any, b: any) => {
        return b.StartDate < a.StartDate
          ? -1
          : b.StartDate > a.StartDate
          ? 1
          : 0;
      });
    setCanclledMeetings(filterdMeetings);
  };
  
  const savePastMeetings = (meetings) => {
    const filterdMeetings = meetings
      .filter((f) => f.Done)
      .sort((a: any, b: any) => {
        return b.StartDate < a.StartDate
          ? -1
          : b.StartDate > a.StartDate
          ? 1
          : 0;
      });
    setPastMeetings(filterdMeetings);
  };

  const reloadData = async () => {
    console.log("FM: ", futureMeetings)
    // console.log("CM: ", cancelledMeetings)
    // console.log("PM: ", pastMeetings)
    await fetchMeetings();
  };

  const FutureMeetingsContainer = () => {
    return (
      <LinearGradient
        colors={LINEAR_GRADIENT_COLORS}
        style={commonStyles.viewContainer}
      >
        <FutureMeetings meetingsList={futureMeetings} reloadData={reloadData} />
      </LinearGradient>
    );
  };

  const CancelledMeetingsContainer = () => {
    return (
      <LinearGradient
        colors={LINEAR_GRADIENT_COLORS}
        style={commonStyles.viewContainer}
      >
        <CancelledMeetings meetingsList={cancelledMeetings} reloadData={reloadData} />
      </LinearGradient>
    );
  };

  const PastMeetingsContainer = () => {
    return (
      <LinearGradient
        colors={LINEAR_GRADIENT_COLORS}
        style={commonStyles.viewContainer}
      >
        <PastMeetings meetingsList={pastMeetings} reloadData={reloadData} />
      </LinearGradient>
    );
  };

  if (isLoading) return <BusyComponent />;

  return (
  <Tab.Navigator
    screenOptions={{
      tabBarLabelStyle: { fontSize: 16 },
      tabBarStyle: { backgroundColor: SEC_TEXT_COLOR },
      tabBarInactiveTintColor: PRY_COLOR,
      tabBarActiveTintColor: SEC_COLOR,
    }}
  >
    <Tab.Screen
      name="UpcomingMeetings"
      component={FutureMeetingsContainer}
      options={{ title: "Upcoming" }} />
    <Tab.Screen
      name="CompletedMeetings"
      component={PastMeetingsContainer}
      options={{ title: "Completed" }} />
    <Tab.Screen
      name="CancelledMeetings"
      component={CancelledMeetingsContainer}
      options={{ title: "Cancelled" }} />
  </Tab.Navigator>
)
};

export default MeetingView;
