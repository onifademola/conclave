import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Title as Tit } from "react-native-paper";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useKeepAwake } from 'expo-keep-awake';
import { useSelector } from 'react-redux';
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import BusyComponent from '../../common/BusyComponent';
import ModalAlertComponent, { ModalType } from '../../common/ModalAlertComponent';
import { ApiRoutes } from '../../consumers/api-routes';
import { HttpPost } from '../../consumers/http';
import {
  isMeetingValidForAttendance,
  calculatePunctuality,
  isMeetingReadyForAttendance
} from '../../consumers/DateHelper';
import { AppButton } from "../../common/AppButton";
import { SEC_TEXT_COLOR } from "../../styles/colors";

interface Attendance {
  email: string;
  arrivalTime: string;
  status: string;
  meetingId: Number;  
}

const TakeAttendanceView = (prop: any) => {
  const appUser = useSelector(state => state.user.loggedInUser);
  const { meeting } = prop.route.params;
  const {
    Id,
    MeetingName,
    StartDate,
    EndDate,
    Department,
    Done,
    Cancelled,
    LateAfter,
  } = meeting;
  const navigation = useNavigation();
  useKeepAwake();
  const [loggedInUser, setLoggedInUser] = useState(appUser);
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
    const isValid = isMeetingValidForAttendance(EndDate, arrivaleDateTime);
    return isValid;
  };

  const canAttendanceStart = (arrivalDateTime) => {
    const canStart = isMeetingReadyForAttendance(StartDate, arrivalDateTime);
    return canStart;
  }

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setIsLoading(true);
    //get the time of attendance for this registration
    const arrivalDateTime = new Date();
    const canAttendanceBeStarted = canAttendanceStart(arrivalDateTime);
    if (!canAttendanceBeStarted) {
      setModalMessage(
        "Sorry, You cannot begin to take attendance for a meeting earlier than 10 minutes to meeting time."
      );
      setModalType(ModalType.error);
      setIsLoading(false);
      setScanned(false);
      return renderModal();
    }
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
      <View
        style={{
          paddingBottom: 10,
          paddingLeft: "5%",
          paddingRight: "5%",
        }}
      >
        <Tit style={{ ...styles.content, fontSize: 28 }}>{MeetingName}</Tit>
        <Tit
          style={{ ...styles.content, fontSize: 16, fontWeight: "800" }}
        >{Department} Department || Late after {LateAfter}mins</Tit>        
        <Tit
          style={{ ...styles.content, fontSize: 15, fontWeight: "800" }}
        >{`${moment(StartDate).format("dddd, MMMM DD, YYYY")} || ${moment(
          StartDate
        ).format("LT")} - ${moment(EndDate).format("LT")}`}</Tit>        
      </View>
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
      <View
        style={{
          padding: "5%",
        }}
      >
        <AppButton
          onPressAction={() =>
            navigation.navigate("MeetingAttendance", { meeting })
          }
          name="btnSubmit"
          title="Go to attendace list"
        />
      </View>
    </View>
  );
  
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTextSec: {
    fontSize: 18,
    color: "yellow",
    padding: 10,
    marginLeft: 5,
  },
  content: {
    color: SEC_TEXT_COLOR,
    fontSize: 16,
  },
});

export default TakeAttendanceView;