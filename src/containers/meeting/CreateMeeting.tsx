import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Formik } from "formik";
import { IconButton } from "react-native-paper";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import { useSelector } from "react-redux";
import { ApiRoutes } from "../../consumers/api-routes";
import { HttpGet, HttpPost } from "../../consumers/http";
import {
  convertedDateCombinationToISO,
  convertToHourMinute,
} from "../../consumers/DateFormatter";
import { AppButton } from "../../common/AppButton";
import AppTextInput from "../../common/AppTextInput";
import { SEC_COLOR } from "../../styles/colors";
import CommonStyles from "../../styles/common";
import BusyComponent from "../../common/BusyComponent";

const iconSize = 40;
const iconColor = "black";
const dateTimeBackgroundColor = SEC_COLOR;

const CreateMeeting = () => {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [meetingDate, setMeetingDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showMode, setShowMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [departmentId, setDepartmentId] = useState(0);
  const [departments, setDepartments] = useState([]);

  const fetchDepartments = async () => {
    setIsLoading(true);
    await HttpGet(loggedInUser.Token, ApiRoutes.getDepartments)
      .then((res) => {
        const result = res.data;
        setDepartments(result.sort((a: any, b: any) => a.name - b.name));
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const saveMeeting = async (meeting) => {
    setIsLoading(true);
    await HttpPost(loggedInUser.Token, ApiRoutes.createMeeting, meeting)
      .then((res) => {
        setIsLoading(false);
        navigation.goBack();
      })
      .catch(() => setIsLoading(false));
  };

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      fetchDepartments();
    }

    return () => {
      mounted = false;
    };
  }, []);

  const changeClockMode = () => {
    setShowMode(!showMode);
  };

  const convertedStartDate = () =>
    convertedDateCombinationToISO(meetingDate, startDate);

  const convertedEndDate = () =>
    convertedDateCombinationToISO(meetingDate, endDate);

  const startDateAndroidPickerShowMode = (mode) => {
    DateTimePickerAndroid.open({
      value: startDate,
      onChange: (event, selectedDate) => {
        if (event.type === "dismissed") return;
        // setMeetingDate(new Date(event.nativeEvent.timestamp));
        setMeetingDate(selectedDate);
      },
      mode,
      is24Hour: showMode,
    });
  };

  const startTimeAndroidPickerShowMode = (mode) => {
    DateTimePickerAndroid.open({
      value: startDate,
      onChange: (event, selectedDate) => {
        if (event.type === "dismissed") return;
        const resultingDate = convertedDateCombinationToISO(
          meetingDate,
          new Date(event.nativeEvent.timestamp)
        );
        setStartDate(resultingDate);
      },
      mode,
      is24Hour: showMode,
    });
  };

  const endTimeAndroidPickerShowMode = (mode) => {
    DateTimePickerAndroid.open({
      value: endDate,
      onChange: (event, selectedDate) => {
        if (event.type === "dismissed") return;
        const resultingDate = convertedDateCombinationToISO(
          meetingDate,
          new Date(event.nativeEvent.timestamp)
        );
        setEndDate(resultingDate);
      },
      mode,
      is24Hour: showMode,
    });
  };

  const showDatePicker = () => {
    startDateAndroidPickerShowMode("date");
  };

  const showStartTimePicker = () => {
    startTimeAndroidPickerShowMode("time");
  };

  const showEndTimePicker = () => {
    endTimeAndroidPickerShowMode("time");
  };

  if (isLoading) {
    return <BusyComponent />;
  }

  return (
    <Formik
      initialValues={{
        siteId: loggedInUser.SiteId,
        createdBy: loggedInUser.Username,
        departmentId: departmentId,
        meetingName: "",
        detail: "",
        startDate: "",
        endDate: "",
        lateAfter: "5",
      }}
      onSubmit={async (values) => {
        const finalValues = { ...values, startDate, endDate, departmentId };
        await saveMeeting(finalValues);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
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
          <View style={styles.linerRowContainer}>
            <View style={styles.linerRowSubContainer}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  paddingTop: 30,
                }}
              >
                <Text style={{ fontSize: 14, color: "black" }}>Department</Text>
                <DropDownPicker
                  schema={{
                    label: "name",
                    value: "id",
                  }}
                  open={open}
                  value={value}
                  items={departments}
                  setOpen={setOpen}
                  setValue={setValue}
                  onChangeValue={(value) => setDepartmentId(value)}
                  style={{
                    ...CommonStyles.textInput,
                    borderTopColor: "transparent",
                    borderLeftColor: "transparent",
                    borderRightColor: "transparent",
                  }}
                  placeholder="Department"
                  textStyle={{
                    fontFamily: "RobotoCondensed_400Regular",
                  }}
                />
              </View>
            </View>
            <View style={{ paddingLeft: 10, ...styles.linerRowSubContainer }}>
              <AppTextInput
                onChangeText={handleChange("lateAfter")}
                onBlur={handleBlur("lateAfter")}
                value={values.lateAfter}
                placeholder="Late After"
                label="Late After (in Mins.)"
                style={{
                  minWidth: "45%",
                  //maxWidth: "80%",
                }}
                keyboardType="number-pad"
              />
            </View>
          </View>

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
          <View style={styles.multipleRowContainer}>
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
              }}
              name="btnSubmit"
              title="save"
            />
          </View>
        </View>
      )}
    </Formik>
  );
};

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
  multipleRowContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-end",
    alignContent: "space-around",
  },
  linerRowContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    //alignContent: "flex-start",
  },
  linerRowSubContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    maxWidth: "60%",
  },
  btnContainer: {
    paddingTop: 60,
  },
});
