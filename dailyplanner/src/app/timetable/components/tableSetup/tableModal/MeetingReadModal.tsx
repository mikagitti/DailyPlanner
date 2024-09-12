import { Button, Modal } from "react-bootstrap";
import { formatDate, getDigitalTime } from "../../../misc/TimeHandle";
import { meetingType } from "../../../misc/types";

interface TableModalProps {
     meeting: meetingType;
     closeModal: () => void;
     editMeeting: (meeting: meetingType) => void;
     deleteMeeting: (id: string) => void;
}

export default function MeetingReadModal({
     meeting,
     closeModal,
     editMeeting,
     deleteMeeting
}: TableModalProps) {

     const handleDeleteMeeting = () => {
          const isConfirmed = window.confirm("Are you sure you want to delete this meeting?");
          if (isConfirmed) {
               closeModal();
               deleteMeeting(meeting.id)
          }
     }

     const handleEditMeeting = () => {
          console.log('MeetingReadModal -> handleEditMeeting -> meeting:', meeting);
          closeModal();
          editMeeting(meeting);
     }

     return (
          <Modal show={true} onHide={closeModal}>
               <Modal.Header closeButton>
                    <Modal.Title>Event Details</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                    <p>Date: {formatDate(meeting.date)}</p>
                    <p>
                         Time: {getDigitalTime(meeting.date)}
                    </p>
                    <p>Event: {meeting.event}</p>
                    <p>Location: {meeting.location}</p>
               </Modal.Body>
               <Modal.Footer>
                    <Button variant="primary" onClick={handleEditMeeting}>
                         Edit
                    </Button>
                    <Button variant="danger" onClick={handleDeleteMeeting}>
                         Delete
                    </Button>
                    <Button variant="secondary" onClick={closeModal}>
                         Close
                    </Button>
               </Modal.Footer>
          </Modal>
     );
}
