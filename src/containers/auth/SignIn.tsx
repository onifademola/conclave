import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { saveLoginData } from "../../redux/user/userSlice";
import { AppButton } from "../../common/AppButton";
import AppTextInput from "../../common/AppTextInput";
import BusyComponent from "../../common/BusyComponent";
import { ApiRoutes } from "../../consumers/api-routes";
import { HttpPost } from "../../consumers/http";
import { saveLoggedInUser } from "../../consumers/storage";

interface Login {
  email: string;
  password: string;
}

const SignIn = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [logInFailed, setLogInFailed] = useState(false);

  const login = async (values: Login) => {
    setIsLoading(true);
    await HttpPost("tt", ApiRoutes.login, values)
      .then(async (res) => {
        if (res && res.status === 200) {
          dispatch(saveLoginData(res.data));
          await saveLoggedInUser(res.data);
          setLogInFailed(false);
          setIsLoading(false);
        } else {
          setLogInFailed(true);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setLogInFailed(true);
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <BusyComponent />;
  }

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={(values) => {
        login(values);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={styles.container}>
          <AppTextInput
            onPressIn={() => setLogInFailed(false)}
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
            placeholder="Email"
            label="Email"
            style={{ marginBottom: 10 }}
          />
          <AppTextInput
            onPressIn={() => setLogInFailed(false)}
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
            placeholder="Password"
            label="Password"
            secureTextEntry
          />

          <Text
            style={{
              textAlign: "center",
              color: "red",
              fontSize: 18,
              fontFamily: "RobotoCondensed_400Regular",
            }}
          >
            {logInFailed ? "LOGIN FAILED! PLEASE TRY AGAIN." : ""}
          </Text>

          <View style={styles.btnContainer}>
            <AppButton
              onPressAction={() => {
                handleSubmit();
              }}
              name="btnSubmit"
              icon="login"
              title="sign in"
            />
          </View>
        </View>
      )}
    </Formik>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 0.7,
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
    paddingTop: 30,
  },
});
