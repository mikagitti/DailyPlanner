import { meetingType } from "@/app/timetable/misc/types";
import axios from "axios";

export const getMeetingsAPI = async () => {
     try {
          const response = await axios.get("http://localhost:5000/schedule");
          const sortedByDateMeetings = response.data.sort(
               (a: meetingType, b: meetingType) => {
                    return (
                         new Date(a.date).getTime() - new Date(b.date).getTime()
                    );
               }
          );
          return sortedByDateMeetings;
     } catch (error) {
          console.error("Error fetching meetings:", error);
          return [];
     }
};

export const deleteMeetingAPI = async (id: string) => {
     try {
          const response = await axios.delete(
               `http://localhost:5000/schedule/${id}`
          );
          return true;
     } catch (error) {
          console.error("Error removing meeting:", error);
          return false;
     }
};

export const addMeetingAPI = async (meeting: meetingType) => {
     try {
          const response = await axios.post(
               "http://localhost:5000/schedule",
               meeting
          );
          return true;
     } catch (error) {
          console.error("Error adding meeting:", error);
          return false;
     }
};

export const updateMeetingAPI = async (meeting: meetingType) => {
     try {
          const response = await axios.put(
               `http://localhost:5000/schedule/${meeting.id}`,
               meeting
          );
          return true;
     } catch (error) {
          console.error("Error updating meeting:", error);
          return false;
     }
};
