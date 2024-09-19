
import { meetingType, TableRowsProps } from "../../misc/types";
import { formatDate, getLocalTimeFromUtc, getWeekdayInLanguage } from "../../misc/TimeHandle";
import './TableRows.css';

export default function TableRows({ meetings, setSelectedMeeting }: TableRowsProps) {

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
        <tr className={`table-row ${isTomorrow(item.date) ? 'table-row-tomorrow' : ''}`} onClick={() => handleRowClick(item)}>
            <td className="table-cell"> {getWeekdayInLanguage(item.date, 'en-EN')} </td>
            <td className="table-cell"> {formatDate(item.date)} </td>
            <td className="table-cell"> {getLocalTimeFromUtc(item.date)} </td>
            <td className="table-cell"> {item.event} </td>
            <td className="table-cell"> {item.location} </td>
        </tr>
    )
}

const isTomorrow = (date: Date) => {

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const meetingDate = new Date(date);

    if (compareDates(meetingDate, today)) {
        return 'table-row today';
    } else if (compareDates(meetingDate, tomorrow)) {
        return 'table-row tomorrow';
    } else {
        return 'table-row';
    }
};

const compareDates = (date1: Date, date2: Date) => {
    return (date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear())
};