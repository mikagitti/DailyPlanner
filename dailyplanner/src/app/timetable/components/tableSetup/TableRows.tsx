
import { meetingType, TableBuilderProps } from "../../misc/types";
import { formatDate, getDigitalTime, getWeekday } from "../../misc/TimeHandle";

export default function TableRows({ meetings, setSelectedMeeting }: TableBuilderProps) {

    const handleRowClick = (item: meetingType) => {
        setSelectedMeeting(item);
    };

    return (
        <>
            <tbody className="table-rows">
                {meetings && meetings.map((item, index) => (
                    <tr className="table-row" key={index} onClick={() => handleRowClick(item)}>
                        <td> {getWeekday(item.date)} </td>
                        <td> {formatDate(item.date)} </td>
                        <td> {getDigitalTime(item.date)} </td>
                        <td> {item.event} </td>
                        <td> {item.location} </td>
                    </tr>
                ))}
            </tbody>
        </>
    );
}
