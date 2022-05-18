import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useKeepAwake } from 'expo-keep-awake';
import BusyComponent from '../../common/BusyComponent';
import ModalAlertComponent, { ModalType } from '../../common/ModalAlertComponent';
import { useNavigation } from "@react-navigation/native";

const TakeAttendanceView = () => {
  useKeepAwake();
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status && status === 'granted');
    })();
  }, []);

  const showModalSuccess = () => {
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 2000);
    return true;
  };

  const showModalError = () => {
    setShowErrorModal(true);
    setTimeout(() => {
      setShowErrorModal(false);
    }, 2000);
    return true;
  };

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    //setIsLoading(true);
    showModalError();
    // const uri = ApiCalls.getUser.concat(`/${data}`);
    // const res = await getAxios(uri, [], "");
    // if (res === 101) {
    //   setIsLoading(false);
    //   setToastMsg("Internet is lost. Please check your network.");
    //   setIsVisible(true);
    //   return null;
    // }
    // if (res.status !== 200) {
    //   setScanned(false);
    //   setIsLoading(false);
    //   showModalError();
    //   return; //stop the execution of this code here when status is not 200
    //}
    // setIsLoading(false);
    // props.navigation.replace("QueueTransactions", { user: res.data });
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

  if (showErrorModal) {
    return <ModalAlertComponent type={ModalType.error} />;
  }
  
  if (showSuccessModal) {
    return <ModalAlertComponent type={ModalType.success} />;
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