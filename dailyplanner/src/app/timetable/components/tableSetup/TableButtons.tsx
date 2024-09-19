import { Container } from "react-bootstrap";

type tableButtonsProps = {
    handleNewMeeting: () => void;
    handleOldMeetings: () => void;
    showOldMeetings: boolean;
};

export default function TableButtons({ handleNewMeeting, handleOldMeetings, showOldMeetings }: tableButtonsProps) {

    return (
        <Container style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <div className="p-4">
                <button className="btn btn-primary" onClick={handleNewMeeting}>Add Meeting</button>
            </div>
            <div className="p-4">
                <button className="btn btn-primary" onClick={handleOldMeetings}>{showOldMeetings ? 'Coming Meetings' : 'Old Meetings'}</button>
            </div>
        </Container>
    );
}