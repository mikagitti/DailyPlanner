import { Container } from "react-bootstrap";
import Header from "./components/Header";
import MeetingTable from "./components/MeetingTable";
import "./components/style.css";

export default function Timetable() {
     return (
          <div className="table-body">
               <div className="m-3 bg-light">
                    <Header />
               </div>

               <div className="m-3 bg-light">
                    <MeetingTable />
               </div>
          </div>
     );
}
