import React from 'react';
import { Chip } from 'react-native-paper';

export enum MeetingStatusType {
  "Done",
  "Pending",
  "Cancelled",
}

export interface MeetingStatusProp {
  type: MeetingStatusType,
  status: string,
  onPress: Function,
}

const Status = {
  [MeetingStatusType.Done]: "checkbox-multiple-marked-circle",
  [MeetingStatusType.Pending]: "clock-alert",
  [MeetingStatusType.Cancelled]: "close-circle-multiple",
};

const Color = {
  [MeetingStatusType.Done]: "green",
  [MeetingStatusType.Pending]: "blue",
  [MeetingStatusType.Cancelled]: "red",
};

const MeetingStatus = (prop: MeetingStatusProp) => {
  const { type, status } = prop.meetingStatus;
  return (
    <Chip icon={Status[type]} textStyle={{ color: Color[type] }}>
      {status}
    </Chip>
  );
}

export default MeetingStatus;