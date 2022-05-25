import React, { useState, useEffect} from 'react';
import { FlatList, SafeAreaView, View } from "react-native";
import { useSelector } from 'react-redux';
import { HttpGet } from '../../consumers/http';
import BusyComponent from '../../common/BusyComponent';
import EmptyList from '../../common/EmptyList';
import { ApiRoutes } from '../../consumers/api-routes';
import AttendanceItem from './AttendanceItem';

const Attendances = () => {
  const loggedInUser = useSelector(state => state.user.loggedInUser);
  
  const { Username } = loggedInUser;
  const [attendanceList, setAttendanceList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAttendanceList = async () => {
    setIsLoading(true);
    const url = `${ApiRoutes.getMyAttendances}/${Username}`;
    await HttpGet(loggedInUser.Token, url)
      .then((res) => {
        setAttendanceList(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(true);
      });
  };

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      fetchAttendanceList();
    }

    return () => {
      mounted = false;
    };
  }, []);

  const renderItem = ({ item }) => {
    return <AttendanceItem item={item} />;
  };

  if (!loggedInUser) return <View></View>;

  return (
    <SafeAreaView
      style={{ flex: 1, }}
    >
      {isLoading ? (
        <BusyComponent />
      ) : attendanceList && attendanceList.length ? (
        <FlatList
          data={attendanceList}
          renderItem={renderItem}
          keyExtractor={(item) => item.Id}
        />
      ) : (
        <EmptyList />
      )}
    </SafeAreaView>
  );
}

export default Attendances;