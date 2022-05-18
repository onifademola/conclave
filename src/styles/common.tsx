import { StyleSheet } from "react-native";

const CommonStyles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingTop: 30,
  },
  textInput: {
    backgroundColor: "white",
    minHeight: 40,
    marginBottom: 10,
    color: "black",
    fontSize: 18,
    padding: 5,
    borderRadius: 5,
    borderBottomWidth: 3,
    minWidth: '85%'
  },
});

export default CommonStyles;
