import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import { Checkbox, IconButton, RadioButton } from "react-native-paper";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useSelector } from "react-redux";
import ModalSelector from "react-native-modal-selector";
import { ApiRoutes } from "../../consumers/api-routes";
import { HttpGet, HttpPost } from "../../consumers/http";
import {
  convertedDateCombinationToISO,
  convertToHourMinute,
} from "../../consumers/DateHelper";
import { AppButton } from "../../common/AppButton";
import AppTextInput from "../../common/AppTextInput";
import {
  SEC_COLOR,
  ACCENT,
  SEC_TEXT_COLOR,
  PRY_COLOR,
} from "../../styles/colors";
import BusyComponent from "../../common/BusyComponent";

const iconSize = 40;
const iconColor = "black";
const dateTimeBackgroundColor = SEC_COLOR;

enum OccurrenceType {
  EVERYDAY = "Every Day",
  EVERYWEEKDAY = "Every Week Day",
  SELECTEDDAYS = "Selected Days",
}

const SelectedDays = {
  Mon: false,
  Tue: false,
  Wed: false,
  Thu: false,
  Fri: false,
};

const WeekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CreateMeeting: React.FC = () => {
  const appUser = useSelector((state) => state.user.loggedInUser);
  const navigation = useNavigation();
  const [loggedInUser, setLoggedInUser] = useState(appUser);
  const [isLoading, setIsLoading] = useState(true);
  const [meetingDate, setMeetingDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showMode, setShowMode] = useState(false);
  const [departmentId, setDepartmentId] = useState(0);
  const [departmentName, setDepartmentName] = useState("");
  const [departments, setDepartments] = useState([]);
  const [createFailed, setCreateFailed] = useState(false);
  const [recurring, setRecurring] = useState(false);
  const [recurringType, setRecurringType] = useState(OccurrenceType.EVERYDAY);
  const [recurringFor, setRecurringFor] = useState("30");
  const [selectedWeekDays, setSelectedWeekDays] = useState(SelectedDays);
  
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      fetchDepartments();
    }

    return () => {
      mounted = false;
    };
  }, []);

  const fetchDepartments = async () => {
    setIsLoading(true);
    await HttpGet(loggedInUser.Token, ApiRoutes.getDepartments)
      .then((res) => {
        const result = res.data.map((item) => ({
          key: item.id,
          label: item.name,
        }));
        setDepartments(result.sort((a: any, b: any) => {
          return a.label < b.label
            ? -1
            : a.label > b.label
            ? 1
            : 0;
        }));
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
        if (res && res.status === 200) {
          setIsLoading(false);
          Toast.showWithGravity("Meeting created.", Toast.LONG, Toast.TOP);
          navigation.goBack();
        } else {
          setIsLoading(false);
          setCreateFailed(true);
          Toast.showWithGravity(
            "Meeting not created. Please try again.",
            Toast.LONG,
            Toast.TOP
          );
        }
      })
      .catch(() => {
        setIsLoading(false);
        setCreateFailed(true);
        Toast.showWithGravity("An error occured.", Toast.LONG, Toast.TOP);
      });
  };

  const createRecurringDatesForEveryDay = () => {
    if (recurringFor < 1) return null;
    if (!moment(meetingDate).isValid) return null;
    const recurringResult = [];
    for (let i = 0; i < recurringFor; i++) {
      const currentDate = moment(meetingDate).add(i, "day");
      const currentStartDate = convertedDateCombinationToISO(
        currentDate,
        startDate
      );
      const currentEndDate = convertedDateCombinationToISO(
        currentDate,
        endDate
      );
      recurringResult.push({
        startDate: currentStartDate,
        endDate: currentEndDate,
      });
    }
    return recurringResult;
  };

  const createRecurringDatesForWeekDays = () => {
    if (recurringFor < 1) return null;
    if (!moment(meetingDate).isValid) return null;
    const recurringResult = [];
    for (let i = 0; i < recurringFor; i++) {
      const currentDate = moment(meetingDate).add(i, "day");
      const currentDateWeekDay = moment(currentDate).format("ddd");
      const isCurrentDateWeekDay =
        currentDateWeekDay !== "Sat" && currentDateWeekDay !== "Sun";
      if (isCurrentDateWeekDay) {
        const currentStartDate = convertedDateCombinationToISO(
          currentDate,
          startDate
        );
        const currentEndDate = convertedDateCombinationToISO(
          currentDate,
          endDate
        );
        recurringResult.push({
          startDate: currentStartDate,
          endDate: currentEndDate,
        });
      }
    }
    return recurringResult;
  };

  const createRecurringDatesForSpecificDays = () => {
    if (recurringFor < 1) return null;
    if (!moment(meetingDate).isValid) return null;
    const selectedDays = [];
    WeekDays.forEach((day) => {
      if (selectedWeekDays[day] === true) {
        selectedDays.push(day);
      }
    });
    
    if (!selectedDays) return;
    
    let recurringResult: any[] = [];
    selectedDays.forEach((day) => {
      const localrecurringDates = [];
      for (let i = 0; i < recurringFor; i++) {
        const currentDate = moment(meetingDate).add(i, "day");
        const currentDateWeekDay = moment(currentDate).format("ddd");
        
        if (currentDateWeekDay === day) {
          const currentStartDate = convertedDateCombinationToISO(
            currentDate,
            startDate
          );
          const currentEndDate = convertedDateCombinationToISO(
            currentDate,
            endDate
          );
          localrecurringDates.push({
            startDate: currentStartDate,
            endDate: currentEndDate,
          });
        }
      }
      const prevReults = [...recurringResult];
      recurringResult = [...prevReults, ...localrecurringDates];      
    });
    return recurringResult;
  };

  const changeClockMode = () => {
    setShowMode(!showMode);
  };

  const resetStates = () => {
    setRecurring(false);
    setRecurringType(OccurrenceType.EVERYDAY);
    setRecurringFor(30);
    setSelectedWeekDays(SelectedDays);
  }

  const startDateAndroidPickerShowMode = (mode) => {
    DateTimePickerAndroid.open({
      value: new Date(),
      minimumDate: new Date(),
      onChange: (event, selectedDate) => {
        if (event.type === "dismissed") {
          if (!moment(startDate).isValid) setStartDate(new Date());
          return;
        }
        const newDate = new Date(event.nativeEvent.timestamp);
        setMeetingDate(newDate);
        const resultingDate = convertedDateCombinationToISO(newDate, startDate);
        setStartDate(resultingDate);
        setEndDate(moment(resultingDate).add(30, "minutes"));
      },
      mode,
      is24Hour: showMode,
    });
  };

  const startTimeAndroidPickerShowMode = (mode) => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange: (event, selectedDate) => {
        if (event.type === "dismissed") {
          if (!moment(startDate).isValid) setStartDate(new Date());
          return;
        }
        const resultingDate = convertedDateCombinationToISO(
          meetingDate,
          new Date(event.nativeEvent.timestamp)
        );
        setStartDate(resultingDate);
        setEndDate(moment(resultingDate).add(30, "minutes"));
      },
      mode,
      is24Hour: showMode,
      // onTouchStart: () => console.log(startDate)
    });
  };

  const endTimeAndroidPickerShowMode = (mode) => {
    DateTimePickerAndroid.open({
      value: new Date(),
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

  const renderReoccurence = () => {
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            backgroundColor: "black",
            borderRadius: 5,
            marginBottom: 10,
          }}
        >
          <RadioButton.Group
            onValueChange={(newValue) => setRecurringType(newValue)}
            value={recurringType}
          >
            <RadioButton.Item
              label="Every Day"
              value={OccurrenceType.EVERYDAY}
              labelStyle={{
                color: "white",
              }}
            />
            <RadioButton.Item
              label="Every Week Days"
              value={OccurrenceType.EVERYWEEKDAY}
              labelStyle={{
                color: "white",
              }}
            />
            <RadioButton.Item
              label="Selected Days"
              value={OccurrenceType.SELECTEDDAYS}
              labelStyle={{
                color: "white",
              }}
            />
          </RadioButton.Group>
          {recurringType === OccurrenceType.SELECTEDDAYS ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <Checkbox.Item
                  label="Mon"
                  position="leading"
                  labelStyle={{
                    color: "white",
                  }}
                  status={selectedWeekDays.Mon ? "checked" : "unchecked"}
                  onPress={() =>
                    setSelectedWeekDays({
                      ...selectedWeekDays,
                      Mon: !selectedWeekDays.Mon,
                    })
                  }
                />
                <Checkbox.Item
                  label="Tue"
                  position="leading"
                  labelStyle={{
                    color: "white",
                  }}
                  status={selectedWeekDays.Tue ? "checked" : "unchecked"}
                  onPress={() =>
                    setSelectedWeekDays({
                      ...selectedWeekDays,
                      Tue: !selectedWeekDays.Tue,
                    })
                  }
                />
                <Checkbox.Item
                  label="Wed"
                  position="leading"
                  labelStyle={{
                    color: "white",
                  }}
                  status={selectedWeekDays.Wed ? "checked" : "unchecked"}
                  onPress={() =>
                    setSelectedWeekDays({
                      ...selectedWeekDays,
                      Wed: !selectedWeekDays.Wed,
                    })
                  }
                />
              </View>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <Checkbox.Item
                  label="Thu"
                  position="leading"
                  labelStyle={{
                    color: "white",
                  }}
                  status={selectedWeekDays.Thu ? "checked" : "unchecked"}
                  onPress={() =>
                    setSelectedWeekDays({
                      ...selectedWeekDays,
                      Thu: !selectedWeekDays.Thu,
                    })
                  }
                />
                <Checkbox.Item
                  label="Fri"
                  position="leading"
                  labelStyle={{
                    color: "white",
                  }}
                  status={selectedWeekDays.Fri ? "checked" : "unchecked"}
                  onPress={(e) => {
                    setSelectedWeekDays({
                      ...selectedWeekDays,
                      Fri: !selectedWeekDays.Fri,
                    });
                  }}
                />
              </View>
            </View>
          ) : null}
        </View>
      </View>
    );
  };

  if (isLoading) {
    return <BusyComponent />;
  }

  return (
    <ScrollView>
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
          let sortedRecurDates = [];
          if (recurring) {
            let recurDates: any[] = [];

            switch (recurringType) {
              case OccurrenceType.EVERYDAY:
                recurDates = createRecurringDatesForEveryDay();
                break;

              case OccurrenceType.EVERYWEEKDAY:
                recurDates = createRecurringDatesForWeekDays();
                break;

              case OccurrenceType.SELECTEDDAYS:
                recurDates = createRecurringDatesForSpecificDays();
                break;

              default:
                break;
            }
            sortedRecurDates = recurDates.sort((a: any, b: any) => {
              return a.startDate < b.startDate
                ? -1
                : a.startDate > b.startDate
                ? 1
                : 0;
            });
          }

          const finalValues = {
            ...values,
            startDate,
            endDate,
            departmentId,
            recurringDates: sortedRecurDates,
          };
          await saveMeeting(finalValues);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.container}>
            <Text
              style={{
                textAlign: "center",
                color: "red",
                fontSize: 18,
                fontFamily: "RobotoCondensed_400Regular",
              }}
            >
              {createFailed ? "MEETING NOT CREATED! PLEASE TRY AGAIN." : ""}
            </Text>
            <AppTextInput
              onChangeText={handleChange("meetingName")}
              onBlur={handleBlur("meetingName")}
              value={values.meetingName}
              placeholder="Meeting"
              label="Meeting"
              onPressIn={() => setCreateFailed(false)}
            />
            <AppTextInput
              onChangeText={handleChange("detail")}
              onBlur={handleBlur("detail")}
              value={values.detail}
              placeholder="Description"
              label="Description"
              multiline
              onPressIn={() => setCreateFailed(false)}
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
                  <ModalSelector
                    data={departments}
                    initValue="Select department"
                    onChange={(value) => {
                      setDepartmentName(value.label);
                      setDepartmentId(value.key);
                    }}
                    optionStyle={{
                      backgroundColor: SEC_TEXT_COLOR,
                      borderColor: "white",
                    }}
                    optionContainerStyle={{
                      backgroundColor: SEC_TEXT_COLOR,
                    }}
                    optionTextStyle={{
                      color: "white",
                    }}
                  >
                    <AppTextInput
                      value={departmentName}
                      placeholder="Department"
                      label="Department"
                      editable={false}
                      style={{
                        backgroundColor: dateTimeBackgroundColor,
                      }}
                    />
                  </ModalSelector>
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

            <View>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Checkbox.Item
                    color="black"
                    status={recurring ? "checked" : "unchecked"}
                    onPress={() => {
                      setRecurring(!recurring);
                    }}
                    label="Is recurring?"
                    position="leading"
                  />
                  {recurring ? (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <Text> For </Text>
                      <AppTextInput
                        onChangeText={(value) => setRecurringFor(value)}
                        value={recurringFor}
                        placeholder="..in days"
                        style={{
                          minWidth: "45%",
                          //maxWidth: "80%",
                        }}
                        keyboardType="number-pad"
                      />
                      <Text> Days</Text>
                    </View>
                  ) : null}
                </View>
                {recurring ? renderReoccurence() : null}
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
                  value={convertToHourMinute(startDate)}
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
                  value={convertToHourMinute(endDate)}
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
    </ScrollView>
  );
};

export default CreateMeeting;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexWrap: "wrap",
  },
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
    paddingTop: 10,
  },
});
