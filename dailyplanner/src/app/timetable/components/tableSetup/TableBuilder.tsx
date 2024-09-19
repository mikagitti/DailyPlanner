'use client';

import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";

import './TableBuilder.css';
import TableHead from "./TableHead";
import TableRows from "./TableRows";
import { meetingType } from "../../misc/types";
import MeetingFormModal from "./tableModal/MeetingFormModal";
import MeetingReadModal from "./tableModal/MeetingReadModal";
import TodayMeetings from "./TodayMeetings";
import TableButtons from "./TableButtons";
import { getMeetingsAPI, addMeetingAPI, updateMeetingAPI, deleteMeetingAPI } from "./API/Meetings";

export default function TableBuilder() {

     const [meetingsToUI, setMeetingsToUI] = useState<meetingType[] | null>(null); // Meetings to show in table
     const [todayMeetings, setTodayMeetings] = useState<meetingType[]>([]); // Today meetings
     const [upComingMeetings, setUpComingMeetings] = useState<meetingType[]>([]); // Upcomming meetings
     const [obsoleteMeetings, setObsoleteMeetings] = useState<meetingType[]>([]); // Old meetings
     const [selectedMeeting, setSelectedMeeting] = useState<meetingType | null>(null); // Selected meeting

     const [showOldMeetings, setShowOldMeetings] = useState(false); // Show old meetings

     const [openSelectedMeetingModal, setOpenSelectedMeetingModal] = useState<boolean>(false);
     const [openNewMeetingModal, setOpenNewMeetingModal] = useState(false);
     const [openEditMeetingModal, setOpenEditMeetingModal] = useState(false);
     const [loading, setLoading] = useState(true);

     // Fetch all meetings when component is mounted
     useEffect(() => {
          fetchAndOrganizeMeetings();
     }, []);

     // Open selected meeting read modal if selectedMeeting is not null
     useEffect(() => {
          if (selectedMeeting) {
               setOpenSelectedMeetingModal(true);
          }
     }, [selectedMeeting]);

     // Fetch all meetings. Organize them to today, upcomming and old meetings.
     const fetchAndOrganizeMeetings = async () => {
          const allMeetings = await fetchAllMeetings();
          if (allMeetings) {
               setTodayMeetings(getTodayMeetings(allMeetings));
               setUpComingMeetings(getUpcommingMeetings(allMeetings));
               setObsoleteMeetings(getOldMeetings(allMeetings));
               setMeetingsToUI(getUpcommingMeetings(allMeetings));

               setShowOldMeetings(false);
          }
     };

     // Fetch all meetings from API
     const fetchAllMeetings = async () => {
          setLoading(true);
          return await getMeetingsAPI().then((meetings) => {
               setLoading(false);
               return meetings;
          });

     };

     // Add new meeting
     const addMeeting = async (meeting: meetingType) => {
          await addMeetingAPI(meeting);
          fetchAndOrganizeMeetings();
          setOpenNewMeetingModal(false);
     };

     // Update meeting
     const updateMeeting = async (meeting: meetingType) => {
          await updateMeetingAPI(meeting);
          fetchAndOrganizeMeetings();
          setOpenEditMeetingModal(false);
     };

     // Delete meeting
     const deleteMeeting = async (id: string) => {
          await deleteMeetingAPI(id);
          fetchAndOrganizeMeetings();
     };

     // Show old meetings
     const handleOldMeetings = () => {
          if (showOldMeetings) {
               setShowOldMeetings(false);
               setMeetingsToUI(upComingMeetings);
               return;
          }
          setShowOldMeetings(true);
          setMeetingsToUI(obsoleteMeetings);
     };

     const handleEditMeeting = (meeting: meetingType) => {
          setSelectedMeeting(meeting);
          setOpenEditMeetingModal(true);
     };

     const closeReadMeetingModal = () => {
          setSelectedMeeting(null);
          setOpenSelectedMeetingModal(false);
     };

     const closeAddMeetingModal = () => {
          setSelectedMeeting(null);
          setOpenNewMeetingModal(false);
     };

     const closeEditMeetingModal = () => {
          setSelectedMeeting(null);
          setOpenEditMeetingModal(false);
     };

     // Show loading text while fetching data
     if (loading)
          return (<h1>Loading...</h1>);

     return (
          <>

               <Container fluid>
                    <h1 className="text-center">Daily Planner</h1>

                    {/* Show buttons for table */}
                    <TableButtons handleNewMeeting={() => setOpenNewMeetingModal(true)} showOldMeetings={showOldMeetings} handleOldMeetings={handleOldMeetings} />

                    {/* Show today meetings only if there are any */}
                    {!showOldMeetings && todayMeetings.length > 0 &&
                         <TodayMeetings todayMeetings={todayMeetings} handleRowClick={setSelectedMeeting} />
                    }

                    {/* Show all meetings */}
                    <div className="p-4">
                         <Table striped bordered hover className="table">
                              <TableHead />
                              {meetingsToUI && meetingsToUI.length > 0
                                   ? <TableRows
                                        meetings={meetingsToUI}
                                        setSelectedMeeting={setSelectedMeeting} />
                                   : showInTableNoMessagesFound}
                         </Table>
                    </div>

                    {/* Show read modal for selected meeting. ReadModal. */}
                    {openSelectedMeetingModal && selectedMeeting &&
                         <MeetingReadModal
                              meeting={selectedMeeting}
                              closeModal={closeReadMeetingModal}
                              editMeeting={handleEditMeeting}
                              deleteMeeting={deleteMeeting} />
                    }

                    {/* Show add meeting modal. FormModal. */}
                    {openNewMeetingModal &&
                         <MeetingFormModal
                              closeModal={closeAddMeetingModal}
                              saveMeeting={addMeeting}
                              title="Add Meeting"
                              buttonText="Add meeting" />
                    }

                    {/* Show edit meeting modal. FormModal. */}
                    {openEditMeetingModal &&
                         selectedMeeting &&
                         <MeetingFormModal
                              closeModal={closeEditMeetingModal}
                              saveMeeting={updateMeeting}
                              meeting={selectedMeeting}
                              title="Edit Meeting"
                              buttonText="Save changes" />
                    }
               </Container>
          </>
     );
}





///Get upcomming meetings
const getUpcommingMeetings = (meetings: meetingType[]) => {
     return sortMeetingsByDateAsc(filterMeetingsByDate(meetings, (meetingDate, currentDate) => meetingDate.getTime() > currentDate.getTime()));
};

///Get today meetings
const getTodayMeetings = (meetings: meetingType[]) => {
     return filterMeetingsByDate(meetings, (meetingDate, currentDate) => meetingDate.getTime() === currentDate.getTime());
};

///Get old meetings
const getOldMeetings = (meetings: meetingType[]) => {
     return sortMeetingsByDateDesc(filterMeetingsByDate(meetings, (meetingDate, currentDate) => meetingDate.getTime() < currentDate.getTime()));
};

const sortMeetingsByDateDesc = (meetings: meetingType[]) => {
     return meetings.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
const sortMeetingsByDateAsc = (meetings: meetingType[]) => {
     return meetings.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};


function filterMeetingsByDate(
     meetings: meetingType[],
     comparator: (meetingDate: Date, currentDate: Date) => boolean
) {
     const currentDate = new Date();
     currentDate.setHours(0, 0, 0, 0);
     return meetings.filter((meeting: meetingType) => {
          const meetingDate = new Date(meeting.date);
          meetingDate.setHours(0, 0, 0, 0);
          return comparator(meetingDate, currentDate);
     });
}

const showInTableNoMessagesFound = <tbody><tr><td
     colSpan={5}
     style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
     No meetings scheduled
</td></tr></tbody>;


