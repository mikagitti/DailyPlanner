
import { meetingType, TableBuilderProps } from "../../misc/types";
import { formatDate, getDigitalTime, getWeekday } from "../../misc/TimeHandle";

export default function TableRows({ meetings, setSelectedMeeting }: TableBuilderProps) {

    const handleRowClick = (item: meetingType) => {
        setSelectedMeeting(item);
    };

    return (
        <>
            <tbody className="table-rows">
                {meetings && meetings.map((item) => (
                    <ShowTableRow key={item.id} item={item} handleRowClick={handleRowClick} />
                ))}
            </tbody>
        </>
    );
}


const ShowTableRow = ({ item, handleRowClick }: { item: meetingType, handleRowClick: (item: meetingType) => void }) => {
    return (
        <tr className={isTomorrow(item.date)} key={item.id} onClick={() => handleRowClick(item)}>
            <td> {getWeekday(item.date)} </td>
            <td> {formatDate(item.date)} </td>
            <td> {getDigitalTime(item.date)} </td>
            <td> {item.event} </td>
            <td> {item.location} </td>
        </tr>
    )
}

const isTomorrow = (date: Date) => {

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const meetingDate = new Date(date);

    if (
        meetingDate.getDate() === today.getDate() &&
        meetingDate.getMonth() === today.getMonth() &&
        meetingDate.getFullYear() === today.getFullYear()
    ) {
        return 'table-row today';
    } else if (
        meetingDate.getDate() === tomorrow.getDate() &&
        meetingDate.getMonth() === tomorrow.getMonth() &&
        meetingDate.getFullYear() === tomorrow.getFullYear()
    ) {
        return 'table-row tomorrow';
    }
    else {
        return 'table-row';
    }
};