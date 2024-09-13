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

const emptyMeetingsMessage = <tbody><tr><td
     colSpan={5}
     style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
     No meetings scheduled
</td></tr></tbody>;


export default function TableBuilder() {

     const [meetings, setMeetings] = useState<meetingType[] | null>(null);
     const [selectedMeeting, setSelectedMeeting] = useState<meetingType | null>(null);
     const [openSelectedMeetingModal, setOpenSelectedMeetingModal] = useState<boolean>(false);
     const [openNewMeetingModal, setOpenNewMeetingModal] = useState(false);
     const [openEditMeetingModal, setOpenEditMeetingModal] = useState(false);

     useEffect(() => {
          fetchMeetings();
     }, []);

     useEffect(() => {
          if (selectedMeeting) {
               setOpenSelectedMeetingModal(true);
          }
     }, [selectedMeeting]);

     const fetchMeetings = async () => {
          try {
               const response = await axios.get("http://localhost:5000/schedule");

               const sortedMeetings = response.data.sort((a: meetingType, b: meetingType) => {
                    return new Date(a.date).getTime() - new Date(b.date).getTime();
               });

               setMeetings(sortedMeetings);
          } catch (error) {
               console.error("Error fetching meetings:", error);
          }
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
               console.log('Meeting added successfully:', response.data);
               fetchMeetings();
          } catch (error) {
               console.error("Error adding meeting:", error);
          }
          finally {
               setOpenNewMeetingModal(false);
          }
     }

     const updateMeeting = async (meeting: meetingType) => {

          console.log('updateMeeting:', meeting.id);

          try {
               const response = await axios.put(`http://localhost:5000/schedule/${meeting.id}`, meeting);
               console.log('Meeting updated successfully:', response.data);
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

     return (
          <Container>
               <h1 className="text-center">Daily Planner</h1>
               <div className="p-4">
                    <button className="btn btn-primary" onClick={handleNewMeeting}>Add Meeting</button>
               </div>
               <div className="p-4">
                    <table style={{ width: "100%" }}>
                         <TableHead />
                         {meetings
                              ? <TableRows
                                   meetings={meetings}
                                   setSelectedMeeting={setSelectedMeeting} />
                              : emptyMeetingsMessage}
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
