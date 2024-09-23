'use client';

import { formatUtcDateTime, splitDateTime } from "@/app/timetable/misc/TimeHandle";
import { NewMeetingModalProps } from "@/app/timetable/misc/types";
import { validateMeetingData } from "@/app/timetable/misc/Validation";
import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';

const styles = {
    formGroup: {
        margin: '10px 0',
    },
};


export default function MeetingFormModal({ closeModal, saveMeeting, meeting, title, buttonText }: NewMeetingModalProps) {

    const [formData, setFormData] = useState({ id: '', event: '', location: '', date: '', time: '' });
    const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({});

    useEffect(() => {
        if (meeting) {
            const { dateUTC, timeUTC } = splitDateTime(meeting.date);
            setFormData({
                id: meeting.id || '',
                event: meeting.event || '',
                location: meeting.location || '',
                date: dateUTC,
                time: timeUTC
            });
        }
    }, []);

    const handleSaveMeeting = (e: React.FormEvent) => {
        e.preventDefault();

        const uuid = meeting && meeting.id ? meeting.id : uuidv4(); // generate new id if new meeting or keep the same id if editing
        formData.id = uuid;

        if (validateMeetingData({ formData, setErrors }) === false) {
            return;
        }

        const formattedDate = formatUtcDateTime(formData.date, formData.time);

        const newMeeting = {
            id: formData.id,
            event: formData.event,
            location: formData.location,
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
                    <Form.Group className="{${errors.event ? 'has-error' : ''}}" controlId="event">
                        <Form.Label>Event</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.event}
                            onChange={(e) => setFormData({ ...formData, event: e.target.value })}
                            placeholder="Enter event"
                        />
                        {errors.event && <p style={{ color: 'red' }}>{errors.event}</p>}
                    </Form.Group>
                    <Form.Group controlId="location" style={styles.formGroup}>
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            placeholder="Enter location"
                        />
                        {errors.location && <p style={{ color: 'red' }}>{errors.location}</p>}
                    </Form.Group>
                    <Form.Group controlId="date" style={styles.formGroup}>
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />
                        {errors.date && <p style={{ color: 'red' }}>{errors.date}</p>}
                    </Form.Group>

                    <Form.Group controlId="time" style={styles.formGroup}>
                        <Form.Label>Time</Form.Label>
                        <Form.Control
                            type="time"
                            value={formData.time}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        />
                        {errors.time && <p style={{ color: 'red' }}>{errors.time}</p>}
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


