import { Badge, Card, Col, Container, Row } from "react-bootstrap";
import { formatDate, getLocalTimeFromUtc } from "../../misc/TimeHandle";
import { meetingType } from "../../misc/types";
import styles from "./TodayMeetings.module.css";


type todayMeetingsProps = {
    todayMeetings: meetingType[];
    handleRowClick: (meeting: meetingType) => void;
};


export default function TodayMeetings({ todayMeetings, handleRowClick }: todayMeetingsProps) {
    return (
        <Container>
            <h1 className={styles.container}>
                <Badge pill bg="danger" className={styles.badge}>🔥</Badge>
                Today's Meetings!
                <Badge pill bg="danger" className={styles.badge}>🔥</Badge>
            </h1>
            {todayMeetings.map((meeting, index) => (
                <Card
                    key={index}
                    onClick={() => handleRowClick(meeting)}
                    className={styles.card}
                >
                    <Card.Body>
                        <Row>
                            <Col className={`${styles.col} ${styles.bold}`}>
                                {formatDate(meeting.date)}
                            </Col>
                            <Col className={`${styles.col} ${styles.italic}`}>
                                {getLocalTimeFromUtc(meeting.date)}
                            </Col>
                            <Col className={styles.col}>
                                {meeting.event}
                            </Col>
                            <Col className={styles.col}>
                                {meeting.location}
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    );
}