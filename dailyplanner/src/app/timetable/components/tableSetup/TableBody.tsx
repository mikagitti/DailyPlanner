"use client";

import { useState } from "react";
import { scheduleType, TableBuilderProps } from "../../misc/types";
import { formatDate, getWeekday } from "../../misc/TimeHandle";
import TableModal from "../TableModal";

export default function TableRows({ scheduleData }: TableBuilderProps) {
    const [selectedItem, setSelectedItem] = useState<scheduleType | null>(null);

    const handleRowClick = (item: scheduleType) => {
        setSelectedItem(item);
    };

    const handleCloseModal = () => {
        setSelectedItem(null);
    };

    return (
        <>
            <tbody>
                {scheduleData.map((item, index) => (
                    <tr className="table-row" key={index} onClick={() => handleRowClick(item)}>
                        <td>{getWeekday(item.date)}</td>
                        <td>{formatDate(item.date)}</td>
                        <td>
                            {item.date.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </td>
                        <td>{item.event}</td>
                        <td>{item.location}</td>
                    </tr>
                ))}
            </tbody>

            {selectedItem && (
                <TableModal selectedItem={selectedItem} handleCloseModal={handleCloseModal} />
            )}
        </>
    );
}
