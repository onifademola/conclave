import * as React from 'react';
import { LinearGradient } from "expo-linear-gradient";
import Header from './Header';
import Content from './Content';
import { MARINE, AQUA_MARINE } from '../../styles/colors';
import commonStyles from '../../styles/common';

const ProfileView = () => {
  return (
    <LinearGradient
      colors={[MARINE, AQUA_MARINE]}
      style={commonStyles.viewContainer}
    >
      <Header />
      <Content />
    </LinearGradient>
  );
};

export default ProfileView;
