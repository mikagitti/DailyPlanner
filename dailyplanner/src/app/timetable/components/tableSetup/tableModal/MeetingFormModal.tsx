'use client';

import { styles } from "./style";

import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

import { formatUtcDateTime, splitDateTime } from "@/app/timetable/misc/TimeHandle";
import { NewMeetingModalProps } from "@/app/timetable/misc/types";
import { validateMeetingData } from "@/app/timetable/misc/Validation";
import ErrorMessage from "./ErrorMessage";



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
                    <Form.Group controlId="event" style={styles.formGroup}>
                        <Form.Label>Event</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.event}
                            onChange={(e) => setFormData({ ...formData, event: e.target.value })}
                            placeholder="Enter event"
                        />
                        {errors.event && <ErrorMessage errorMessage={errors.event} />}
                    </Form.Group>
                    <Form.Group controlId="location" style={styles.formGroup}>
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            placeholder="Enter location"
                        />
                        {errors.location && <ErrorMessage errorMessage={errors.location} />}
                    </Form.Group>
                    <Form.Group controlId="date" style={styles.formGroup}>
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />
                        {errors.date && <ErrorMessage errorMessage={errors.date} />}
                    </Form.Group>

                    <Form.Group controlId="time" style={styles.formGroup}>
                        <Form.Label>Time</Form.Label>
                        <Form.Control
                            type="time"
                            value={formData.time}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        />
                        {errors.time && <ErrorMessage errorMessage={errors.time} />}
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


