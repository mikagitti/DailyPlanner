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

function splitDateTime(dateTime: Date | string) {
    const meetingDate = new Date(dateTime);
    const dateUTC = meetingDate.toISOString().split('T')[0];
    const timeUTC = meetingDate.toTimeString().split(' ')[0].substring(0, 5);
    return { dateUTC, timeUTC };
}

export default function MeetingFormModal({ closeModal, saveMeeting, meeting, title, buttonText }: NewMeetingModalProps) {
    const [event, setEvent] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    useEffect(() => {
        if (meeting) {
            setEvent(meeting.event || '');
            setLocation(meeting.location || '');

            const { dateUTC, timeUTC } = splitDateTime(meeting.date);
            setDate(dateUTC);
            setTime(timeUTC);
        }
    }, []);

    const handleSaveMeeting = (e: React.FormEvent) => {
        e.preventDefault();

        let formattedDate = new Date(date);
        formattedDate.setHours(Number(time.split(":")[0]));
        formattedDate.setMinutes(Number(time.split(":")[1]));

        const utcDate = formattedDate.toISOString(); // YYYY-MM-DDTHH:mm:ss.sssZ
        formattedDate = new Date(utcDate);

        const uuid = meeting && meeting.id ? meeting.id : uuidv4(); // generate new id if new meeting or keep the same id if editing

        const newMeeting = {
            id: uuid,
            event: event,
            location: location,
            date: formattedDate,
        };
        saveMeeting(newMeeting);
        closeModal;
    };

    return (
        <Modal show={true} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSaveMeeting}>
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