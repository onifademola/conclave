import * as React from 'react';
import { LinearGradient } from "expo-linear-gradient";
import Header from './Header';
import Content from './Content';
import { LINEAR_GRADIENT_COLORS } from "../../styles/colors";
import commonStyles from '../../styles/common';
import ScreenHeader from '../../common/ScreenHeader';

const ProfileView = () => {
  return (
    <LinearGradient
      colors={LINEAR_GRADIENT_COLORS}
      style={commonStyles.viewContainer}
    >
      <ScreenHeader title="Profile" />
      <Header />
      <Content />
    </LinearGradient>
  );
};

export default ProfileView;
