export type meetingType = {
     id: string;
     date: Date;
     event: string;
     location: string;
};

export interface TableBuilderProps {
     meetings: meetingType[];
     setSelectedMeeting: (meeting: meetingType | null) => void;
}

export interface NewMeetingModalProps {
     title: string;
     buttonText: string;
     meeting?: meetingType;
     closeModal: () => void;
     saveMeeting: (meeting: meetingType) => void;
}
