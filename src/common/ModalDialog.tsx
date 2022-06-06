import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Switch } from 'react-native';
import Toast from "react-native-simple-toast";
import { PRY_COLOR, ACCENT, SEC_COLOR, TEXT_COLOR } from "../styles/colors";
import TinyBusyComponent from './TinyBusyComponent';

const textColor = PRY_COLOR;

const ModalDialog = ({ resetModal, onPressCancel, onPressDelete, meeting } ) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [deleteRecurring, setDeleteRecurring] = useState(false);
  const [isBusy, setIsBusy] = useState(false);

  const cancelMeeting = async () => {
    setIsBusy(true);
    const meetingToCancel = { ...meeting, Cancelled: true };
    await onPressCancel(meetingToCancel, deleteRecurring)
      .then(async () => {
        setIsBusy(false);
        Toast.showWithGravity("Meeting(s) cancelled.", Toast.LONG, Toast.TOP);
        setModalVisible(false);
        await resetModal();
      })
      .catch(async () => {
        setIsBusy(false);
        Toast.showWithGravity("Meeting(s) cancelled.", Toast.LONG, Toast.TOP);
        setModalVisible(false);
        await resetModal();
      });
  };
  
  const deleteMeeting = async () => {
    setIsBusy(true);
    await onPressDelete(meeting, deleteRecurring)
      .then(async () => {
        setIsBusy(false);
        Toast.showWithGravity("Meeting(s) deleted.", Toast.LONG, Toast.TOP);
        setModalVisible(false);
        await resetModal();
      })
      .catch(async () => {
        setIsBusy(false);
        Toast.showWithGravity("Meeting(s) deleted.", Toast.LONG, Toast.TOP);
        setModalVisible(false);
        await resetModal();
      });
  };
  
  return (
    <Modal transparent visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={{ fontSize: 18, paddingBottom: 5 }}>CANCEL/DELETE</Text>
          <Text style={styles.modalText}>
            Do you want to cancel or delete this meeting? (You can only do this
            if the meeting has not started, or has not been done)
          </Text>
          <Text>Choose GO BACK if you don't want to continue.</Text>
          {isBusy ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <TinyBusyComponent />
            </View>
          ) : (
            <>
              {meeting && meeting.RecurringId ? (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Switch
                    trackColor={{ false: PRY_COLOR, true: TEXT_COLOR }}
                    thumbColor={deleteRecurring ? SEC_COLOR : ACCENT}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => setDeleteRecurring(!deleteRecurring)}
                    value={deleteRecurring}
                  />
                  <Text>
                    {deleteRecurring
                      ? "Cancel/delete all occurrences"
                      : "Cancel/delete only this meeting"}
                  </Text>
                </View>
              ) : null}
              <View style={styles.buttonView}>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity
                    onPress={async () => {
                      setModalVisible(false);
                      await resetModal();
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        textAlign: "left",
                        width: "80%",
                        color: textColor,
                      }}
                    >
                      GO BACK
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flex: 2,
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                  }}
                >
                  <TouchableOpacity
                    onPress={async () => {
                      await cancelMeeting();
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "left",
                        color: textColor,
                        paddingRight: 20,
                      }}
                    >
                      CANCEL
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={async () => {
                      await deleteMeeting();
                    }}
                  >
                    <Text style={{ textAlign: "right", color: textColor }}>
                      DELETE
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ModalDialog;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 35,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 10,
  },
});
