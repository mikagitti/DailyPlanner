
import { scheduleData } from "../database/schedules";
import TableBuilder from "./tableSetup/TableBuilder";

export default function Table() {
     return (
          <TableBuilder scheduleData={scheduleData} />
     );
}
