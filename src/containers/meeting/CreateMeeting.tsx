import React, { useState, } from 'react';
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import { IconButton } from 'react-native-paper';
import moment from 'moment';
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import {
  convertedDateCombinationToISO,
  convertToHourMinute,
} from "../../consumers/DateFormatter";
import { AppButton } from '../../common/AppButton';
import AppTextInput from '../../common/AppTextInput';
import { SEC_COLOR } from '../../styles/colors';

const iconSize = 40;
const iconColor = "black";
const dateTimeBackgroundColor = SEC_COLOR;

const CreateMeeting = () => {
  const [meetingDate, setMeetingDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showMode, setShowMode] = useState(false);

  const changeClockMode = () => {
    setShowMode(!showMode);
  };

  const convertedStartDate = () => 
    convertedDateCombinationToISO(meetingDate, startDate);

  const convertedEndDate = () =>
    convertedDateCombinationToISO(meetingDate, endDate);

  const startDateAndroidPickerShowMode = mode => {
    DateTimePickerAndroid.open({
      value: startDate,
      onChange: (event, selectedDate) => {
        if (event.type === "dismissed") return;
        setMeetingDate(new Date(event.nativeEvent.timestamp));        
      },
      mode,
      is24Hour: showMode,
    });
  };
  
  const startTimeAndroidPickerShowMode = mode => {
    DateTimePickerAndroid.open({
      value: startDate,
      onChange: (event, selectedDate) => {
        if (event.type === "dismissed") return;
        setStartDate(new Date(event.nativeEvent.timestamp));        
      },
      mode,
      is24Hour: showMode,
    });
  };

  const endTimeAndroidPickerShowMode = mode => {
    DateTimePickerAndroid.open({
      value: endDate,
      onChange: (event, selectedDate) => {
        if (event.type === 'dismissed') return;
        setEndDate(new Date(event.nativeEvent.timestamp));
      },
      mode,
      is24Hour: showMode,
    });
  }

  const showDatePicker = () => {
    startDateAndroidPickerShowMode('date');
  };

  const showStartTimePicker = () => {
    startTimeAndroidPickerShowMode('time');
  };

  const showEndTimePicker = () => {
    endTimeAndroidPickerShowMode('time');
  };

  return (
    <Formik
      initialValues={{
        department: "",
        meetingName: "",
        detail: "",
        startDate: "",
        endDate: "",
        createdBy: "",
      }}
      onSubmit={(values) => {
        console.log(values);
        const finalValues = { ...values, startDate, endDate };
        console.log(finalValues);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, resetForm }) => (
        <View style={styles.container}>
          <AppTextInput
            onChangeText={handleChange("meetingName")}
            onBlur={handleBlur("meetingName")}
            value={values.meetingName}
            placeholder="Meeting"
            label="Meeting"
          />
          <AppTextInput
            onChangeText={handleChange("detail")}
            onBlur={handleBlur("detail")}
            value={values.detail}
            placeholder="Description"
            label="Description"
            multiline
          />
          <AppTextInput
            onChangeText={handleChange("department")}
            onBlur={handleBlur("department")}
            value={values.department}
            placeholder="Department"
            label="Department"
          />
          <View style={styles.rowContainer}>
            <AppTextInput
              value={moment(meetingDate).format("dddd, MMMM Do YYYY")}
              placeholder="Date"
              label="Date"
              editable={false}
              style={{
                backgroundColor: dateTimeBackgroundColor,
              }}
            />
            <TouchableOpacity activeOpacity={0.7}>
              <IconButton
                color={iconColor}
                icon="calendar-month"
                size={iconSize}
                onPress={showDatePicker}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.miultipleRowContainer}>
            <View style={styles.rowContainer}>
              <AppTextInput
                value={convertToHourMinute(convertedStartDate())}
                placeholder="From"
                label="From"
                editable={false}
                style={{
                  minWidth: "30%",
                  backgroundColor: dateTimeBackgroundColor,
                }}
              />
              <TouchableOpacity activeOpacity={0.7}>
                <IconButton
                  color={iconColor}
                  icon="calendar-clock"
                  size={iconSize}
                  onPress={showStartTimePicker}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.rowContainer}>
              <AppTextInput
                value={convertToHourMinute(convertedEndDate())}
                placeholder="To"
                label="To"
                editable={false}
                style={{
                  minWidth: "30%",
                  backgroundColor: dateTimeBackgroundColor,
                }}
              />
              <TouchableOpacity activeOpacity={0.7}>
                <IconButton
                  color={iconColor}
                  icon="calendar-clock"
                  size={iconSize}
                  onPress={showEndTimePicker}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.btnContainer}>
            <AppButton
              onPressAction={() => {
                handleSubmit();
                // resetForm();
              }}
              name="btnSubmit"
              icon="camera"
              title="save"
            />
          </View>
        </View>
      )}
    </Formik>
  );
}

export default CreateMeeting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignContent: "space-between",
    padding: 20,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  miultipleRowContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-end",
    alignContent: "space-around",
  },
  btnContainer: {
    paddingTop: 60,
  },
});


