'use client';
import { NewMeetingModalProps } from "@/app/timetable/misc/types";
import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';

const styles = {
    formGroup: {
        margin: '10px 0',
    },
};

export default function MeetingFormModal({ closeModal, saveMeeting, meeting, title, buttonText }: NewMeetingModalProps) {
    const [event, setEvent] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const handleAddMeeting = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission behavior
        const formattedDate = new Date(date);
        formattedDate.setHours(Number(time.split(":")[0]));
        formattedDate.setMinutes(Number(time.split(":")[1]));
        const newUuid = meeting && meeting.id ? meeting.id : uuidv4();

        const newMeeting = {
            id: newUuid,
            event: event,
            location: location,
            date: formattedDate
        };
        saveMeeting(newMeeting);
        closeModal;
    };

    useEffect(() => {
        if (meeting) {
            setEvent(meeting.event || '');
            setLocation(meeting.location || '');

            const meetingDate = new Date(meeting.date);
            setDate(meetingDate.toISOString().split('T')[0]);
            setTime(meetingDate.toISOString().split('T')[1].substring(0, 5));
        }
    }, []);

    return (
        <Modal show={true} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleAddMeeting}>
                <Modal.Body>
                    <Form.Group controlId="event">
                        <Form.Label>Event</Form.Label>
                        <Form.Control
                            type="text"
                            value={event}
                            onChange={(e) => setEvent(e.target.value)}
                            placeholder="Enter event"
                        />
                    </Form.Group>
                    <Form.Group controlId="location" style={styles.formGroup}>
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Enter location"
                        />
                    </Form.Group>
                    <Form.Group controlId="date" style={styles.formGroup}>
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="time" style={styles.formGroup}>
                        <Form.Label>Time</Form.Label>
                        <Form.Control
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="success" type="submit">
                        {buttonText}
                    </Button>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                </Modal.Footer>

            </Form>

        </Modal>
    );
}