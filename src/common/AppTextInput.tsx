import React from 'react';
import { TextInput, View, Text } from "react-native";
import CommonStyles from '../styles/common';

const AppTextInput = ({
  label,
  placeholder,
  value,
  editable = true,
  onBlur,
  onChangeText,
  iconName,
  secureTextEntry = false,
  multiline = false,
  onPressIn,
  style,
  keyboardType = "default",
}) => {
  return (
    <View>
      <Text style={{ fontSize: 14, color: "black" }}>{label}</Text>
      <TextInput
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
        editable={editable}
        style={{ ...CommonStyles.textInput, ...style }}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
        clearButtonMode="always"
        onPressIn={onPressIn}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default AppTextInput;
