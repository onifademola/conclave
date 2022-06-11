import React, { useState, useEffect} from 'react';
import { FlatList, SafeAreaView, RefreshControl } from "react-native";
import { useSelector } from 'react-redux';
import { HttpGet } from '../../consumers/http';
import BusyComponent from '../../common/BusyComponent';
import EmptyList from '../../common/EmptyList';
import { ApiRoutes } from '../../consumers/api-routes';
import AttendanceItem from './AttendanceItem';

const Attendances = () => {
  const appUser = useSelector(state => state.user.loggedInUser);
  const [loggedInUser, setLoggedInUser] = useState(appUser);
  const [attendanceList, setAttendanceList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  const { Username } = loggedInUser;

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

    const onRefresh = async () => {
      setRefreshing(true);
      const url = `${ApiRoutes.getMyAttendances}/${Username}`;
      await HttpGet(loggedInUser.Token, url)
        .then((res) => {
          setAttendanceList(res.data);
          setRefreshing(false);
        })
        .catch((err) => {
          setRefreshing(true);
        });
    };

  const renderItem = ({ item }) => {
    return <AttendanceItem item={item} />;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isLoading ? (
        <BusyComponent />
      ) : attendanceList && attendanceList.length ? (
        <FlatList
          data={attendanceList}
          renderItem={renderItem}
          keyExtractor={(item) => item.Id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <EmptyList touched={() => fetchAttendanceList()} />
      )}
    </SafeAreaView>
  );
}

export default Attendances;