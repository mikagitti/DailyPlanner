import { Dispatch, SetStateAction } from "react";

export type meetingType = {
     id: string;
     date: Date;
     event: string;
     location: string;
};

export interface TableRowsProps {
     meetings: meetingType[];
     setSelectedMeeting: (meeting: meetingType) => void;
}

export interface NewMeetingModalProps {
     title: string;
     buttonText: string;
     meeting?: meetingType;
     closeModal: () => void;
     saveMeeting: (meeting: meetingType) => void;
}
