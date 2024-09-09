import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Table from "./components/Table";
import "./components/style.css";

export default function Timetable() {
     return (
          <div className="table-body">
               <div className="m-3 bg-light">
                    <Header />
               </div>

               <div className="m-3 bg-light">
                    <Table />
               </div>
          </div>
     );
}
