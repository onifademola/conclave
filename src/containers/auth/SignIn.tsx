import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { saveLoginData, reset } from "../../redux/user/userSlice";
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
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const login = async (values: Login) => {
    setIsLoading(true);
    await HttpPost(ApiRoutes.login, values)
      .then(async (res) => {
        dispatch(saveLoginData(res.data));
        await saveLoggedInUser(res.data);
        setIsLoading(false);
        console.log(res.data);
        // if (!res.data) setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
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
      {({ handleChange, handleBlur, handleSubmit, values, resetForm }) => (
        <View style={styles.container}>
          <AppTextInput
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
            placeholder="Email"
            label="Email"
            style={{ marginBottom: 10 }}
          />
          <AppTextInput
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
            placeholder="Password"
            label="Password"
            secureTextEntry
          />

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
    paddingTop: 60,
  },
});
