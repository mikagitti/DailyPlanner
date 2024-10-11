import Header from "./components/Header";
import MeetingTable from "./components/MeetingTable";
import "./components/style.css";

export default function Timetable() {
     return (
          <div className="table-body">
               <div>
                    <Header />
               </div>

               <div>
                    <MeetingTable />
               </div>
          </div>
     );
}
