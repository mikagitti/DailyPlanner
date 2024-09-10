'use client';
import { Container } from "react-bootstrap";
import "./style.css";

import TableHead from "./TableHead";
import TableRows from "./TableBody";

import { useEffect, useState } from "react";
import axios from "axios";

export default function TableBuilder() {

     const [meetings, setMeetings] = useState([]);

     useEffect(() => {
          fetchMeetings();
     }, []);

     const fetchMeetings = async () => {
          try {
               const response = await axios.get("http://localhost:5000/schedule");
               setMeetings(response.data);
          } catch (error) {
               console.error("Error fetching meetings:", error);
          }
     };

     return (
          <Container>
               <div className="p-4">
                    <table style={{ width: "100%" }}>
                         <TableHead />
                         {meetings && <TableRows scheduleData={meetings} />}
                    </table>
               </div>
          </Container>
     );
}
