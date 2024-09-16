'use client';

import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";

import "./style.css";
import TableHead from "./TableHead";
import TableRows from "./TableRows";
import { meetingType } from "../../misc/types";
import MeetingFormModal from "./tableModal/MeetingFormModal";
import MeetingReadModal from "./tableModal/MeetingReadModal";

export default function TableBuilder() {

     const [meetings, setMeetings] = useState<meetingType[] | null>(null);
     const [selectedMeeting, setSelectedMeeting] = useState<meetingType | null>(null);
     const [openSelectedMeetingModal, setOpenSelectedMeetingModal] = useState<boolean>(false);
     const [openNewMeetingModal, setOpenNewMeetingModal] = useState(false);
     const [openEditMeetingModal, setOpenEditMeetingModal] = useState(false);
     const [loading, setLoading] = useState(true);
     const [oldMeetings, setOldMeetings] = useState(false);

     useEffect(() => {
          fetchMeetings();
     }, []);

     useEffect(() => {
          if (selectedMeeting) {
               setOpenSelectedMeetingModal(true);
          }
     }, [selectedMeeting]);

     const fetchMeetings = async () => {
          setLoading(true);
          getUpcommingMeetings().then((meetings) => {
               setMeetings(meetings);
               setLoading(false);
          });
     };

     const deleteMeeting = async (id: string) => {
          try {
               const response = await axios.delete(`http://localhost:5000/schedule/${id}`);
               fetchMeetings();
          } catch (error) {
               console.error("Error removing meeting:", error);
          }
          finally {
               setOpenSelectedMeetingModal(false);
          }
     };

     const addMeeting = async (meeting: meetingType) => {
          try {
               const response = await axios.post("http://localhost:5000/schedule", meeting);
               fetchMeetings();
          } catch (error) {
               console.error("Error adding meeting:", error);
          }
          finally {
               setOpenNewMeetingModal(false);
          }
     }

     const updateMeeting = async (meeting: meetingType) => {
          try {
               const response = await axios.put(`http://localhost:5000/schedule/${meeting.id}`, meeting);
               fetchMeetings();
          } catch (error) {
               console.error("Error updating meeting:", error);
          }
          finally {
               setOpenEditMeetingModal(false);
          }
     }

     const handleNewMeeting = () => {
          setOpenNewMeetingModal(true);
     }

     const showOldMeetings = async () => {

          if (oldMeetings) {
               await fetchMeetings();
               setOldMeetings(!oldMeetings);
               return;
          }

          await getOldMeetings().then((meetings) => {
               setMeetings(meetings);
          });

          setOldMeetings(!oldMeetings);
     }

     const handleEditMeeting = (meeting: meetingType) => {
          setSelectedMeeting(meeting);
          setOpenEditMeetingModal(true);
     }

     const closeMeetingReadModal = () => {
          setOpenSelectedMeetingModal(false);
     }

     const closeMeetingAddModal = () => {
          setOpenNewMeetingModal(false);
          setSelectedMeeting(null);
     }

     const closeMeetingEditModal = () => {
          setOpenEditMeetingModal(false);
          setSelectedMeeting(null);
     }

     if (loading) return <h1>Loading...</h1>;

     return (
          <Container fluid>
               <h1 className="text-center">Daily Planner</h1>
               <Container style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <div className="p-4">
                         <button className="btn btn-primary" onClick={handleNewMeeting}>Add Meeting</button>
                    </div>
                    <div className="p-4">
                         <button className="btn btn-primary" onClick={showOldMeetings}>{oldMeetings ? 'Coming Meetings' : 'Old Meetings'}</button>
                    </div>
               </Container>
               <div className="p-4">
                    <table style={{ width: "100%" }}>
                         <TableHead />
                         {meetings
                              ? <TableRows
                                   meetings={meetings}
                                   setSelectedMeeting={setSelectedMeeting} />
                              : showInTableNoMessagesFound}
                    </table>
               </div>

               {openSelectedMeetingModal && selectedMeeting &&
                    <MeetingReadModal
                         meeting={selectedMeeting}
                         closeModal={closeMeetingReadModal}
                         editMeeting={handleEditMeeting}
                         deleteMeeting={deleteMeeting} />
               }

               {openNewMeetingModal &&
                    <MeetingFormModal
                         closeModal={closeMeetingAddModal}
                         saveMeeting={addMeeting}
                         title="Add Meeting"
                         buttonText="Add meeting" />
               }

               {openEditMeetingModal &&
                    selectedMeeting &&
                    <MeetingFormModal
                         closeModal={closeMeetingEditModal}
                         saveMeeting={updateMeeting}
                         meeting={selectedMeeting}
                         title="Edit Meeting"
                         buttonText="Save changes" />
               }
          </Container>
     );
}


const getMeetings = async () => {
     try {
          const response = await axios.get("http://localhost:5000/schedule");

          const sortedByDateMeetings = response.data.sort((a: meetingType, b: meetingType) => {
               return new Date(a.date).getTime() - new Date(b.date).getTime();
          });

          return sortedByDateMeetings;

     } catch (error) {
          console.error("Error fetching meetings:", error);
     }
};

const removeOldMeetings = async (meetings: meetingType[]) => {
     const currentDate = new Date();
     const updatedMeetings = meetings.filter((meeting: meetingType) => {
          const meetingDate = new Date(meeting.date);
          meetingDate.setHours(0, 0, 0, 0);
          const currentDateWithoutTime = new Date(currentDate);
          currentDateWithoutTime.setHours(0, 0, 0, 0);
          return meetingDate >= currentDateWithoutTime;
     });

     return updatedMeetings;
};

const removeUpcomingMeetings = async (meetings: meetingType[]) => {
     const currentDate = new Date();
     const updatedMeetings = meetings.filter((meeting: meetingType) => {
          const meetingDate = new Date(meeting.date);
          meetingDate.setHours(0, 0, 0, 0);
          const currentDateWithoutTime = new Date(currentDate);
          currentDateWithoutTime.setHours(0, 0, 0, 0);
          return meetingDate < currentDateWithoutTime;
     });

     return updatedMeetings;
};

const getUpcommingMeetings = async () => {
     const meetings = await getMeetings();
     const upcomingMeetings = removeOldMeetings(meetings);
     return upcomingMeetings;
};

const getOldMeetings = async () => {
     const meetings = await getMeetings();
     const oldMeetings = removeUpcomingMeetings(meetings);
     return oldMeetings;
};

const showInTableNoMessagesFound = <tbody><tr><td
     colSpan={5}
     style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
     No meetings scheduled
</td></tr></tbody>;
