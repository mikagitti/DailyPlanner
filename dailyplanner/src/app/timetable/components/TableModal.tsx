import { Button, Modal } from "react-bootstrap";
import { formatDate } from "../misc/TimeHandle";
import { scheduleType } from "../misc/types";

interface TableModalProps {
     selectedItem: scheduleType;
     handleCloseModal: () => void;
}

export default function TableModal({
     selectedItem,
     handleCloseModal,
}: TableModalProps) {
     return (
          <Modal show={true} onHide={handleCloseModal}>
               <Modal.Header closeButton>
                    <Modal.Title>Event Details</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                    <p>Date: {formatDate(selectedItem.date)}</p>
                    <p>
                         Time:{" "}
                         {selectedItem.date.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                         })}
                    </p>
                    <p>Event: {selectedItem.event}</p>
                    <p>Location: {selectedItem.location}</p>
               </Modal.Body>
               <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                         Close
                    </Button>
               </Modal.Footer>
          </Modal>
     );
}
