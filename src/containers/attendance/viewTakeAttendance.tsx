import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useKeepAwake } from 'expo-keep-awake';
import { useNavigation } from "@react-navigation/native";
import { useSelector } from 'react-redux';
import BusyComponent from '../../common/BusyComponent';
import ModalAlertComponent, { ModalType } from '../../common/ModalAlertComponent';
import { ApiRoutes } from '../../consumers/api-routes';
import { HttpPost } from '../../consumers/http';
import { isMeetingValidForAttendance, calculatePunctuality } from '../../consumers/DateHelper';

interface Attendance {
  email: string;
  arrivalTime: string;
  status: string;
  meetingId: Number;  
}

const TakeAttendanceView = (prop: any) => {
  const loggedInUser = useSelector(state => state.user.loggedInUser);
  const {
    Id,
    MeetingName,
    StartDate,
    EndDate,
    Department,
    Done,
    Cancelled,
    LateAfter,
  } = prop.route.params.meeting;
  useKeepAwake();
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState(ModalType.success);
  const [showModal, setShowModal] = useState(false);
  const modalTimeoutRate = 2000;

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status && status === "granted");
    })();
  }, []);

  const renderModal = () => {
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, modalTimeoutRate);
  }

  // attendance will only be possible is meeting is still valid i.e not in the past
  const isAttendancePossible = (arrivaleDateTime) => {
    if (Done == null && Cancelled == null) return true;
    if (Cancelled) return false;
    if (Done) return false;
    const isValid = isMeetingValidForAttendance(EndDate, arrivaleDateTime);
    if (isValid) return true;
      else return false;    
  };

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setIsLoading(true);
    //get the time of attendance for this registration
    const arrivalDateTime = new Date();
    const isAttendanceStillPossible = isAttendancePossible(arrivalDateTime);
    if (!isAttendanceStillPossible) {
      setModalMessage(
        "Sorry, This meeting has been done, cancelled, or is in the past. We are not able to register your attendance."
      );
      setModalType(ModalType.error);
      setIsLoading(false);
      setScanned(false);
      return renderModal();
    }
    const getLateness = calculatePunctuality(StartDate, arrivalDateTime, LateAfter);
    const attendance: Attendance = {
      meetingId: Id,
      email: data,
      arrivalTime: arrivalDateTime.toISOString(),
      status: getLateness
    };
    
    await HttpPost(loggedInUser.Token, ApiRoutes.createAttendance, attendance)
      .then((res) => {
        setIsLoading(false);
        if (res && res.status === 200) {
          setModalMessage("Your CLOCK-IN has been registered.");
          setModalType(ModalType.success);
          setScanned(false);
          return renderModal();
        } else {
          setIsLoading(false);
          setModalMessage("Sorry, Your CLOCK-IN failed.");
          setModalType(ModalType.error);
          setScanned(false);
          return renderModal();
        }
      })
      .catch(() => {
        setIsLoading(false);
        setModalMessage(
          "Sorry, Your CLOCK-IN failed."
        );
        setModalType(ModalType.error);
        setScanned(false);
        return renderModal();
      });
  };

  if (hasPermission === null) {
    return <Text></Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (isLoading) {
    return <BusyComponent />;
  }

  if (showModal) {
    return <ModalAlertComponent type={modalType} message={modalMessage} />;
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.subContainer}>
        <BarCodeScanner
          onTouchEnd={scanned ? undefined : handleBarCodeScanned}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        <Text style={styles.buttonTextSec} onPress={() => setScanned(false)}>
          Tap here to scan if screen goes idle
        </Text>
      </View>
    </View>
  );
  
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 5,
  },
  subContainer: {
    flex: 1,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTextSec: {
    fontSize: 18,
    color: "yellow",
    padding: 10,
    marginLeft: 5,
  },
});

export default TakeAttendanceView;