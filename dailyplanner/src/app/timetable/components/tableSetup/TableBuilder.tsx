import { Container } from "react-bootstrap";
import { TableBuilderProps } from "../../misc/types";

import "./style.css";

import TableHead from "./TableHead";
import TableRows from "./TableBody";

export default function TableBuilder({ scheduleData }: TableBuilderProps) {
     return (
          <Container>
               <div className="p-4">
                    <table style={{ width: "100%" }}>
                         <TableHead />
                         <TableRows scheduleData={scheduleData} />
                    </table>
               </div>
          </Container>
     );
}
