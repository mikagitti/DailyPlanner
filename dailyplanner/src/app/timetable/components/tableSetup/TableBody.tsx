"use client";

import { useState } from "react";
import { scheduleType, TableBuilderProps } from "../../misc/types";
import { formatDate, getDigitalTime, getWeekday } from "../../misc/TimeHandle";
import TableModal from "../TableModal";
import { Button } from "react-bootstrap";

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
                {scheduleData && scheduleData.map((item, index) => (
                    <tr className="table-row" key={index} onClick={() => handleRowClick(item)}>
                        <td> {getWeekday(item.date)} </td>
                        <td> {formatDate(item.date)} </td>
                        <td> {getDigitalTime(item.date)} </td>
                        <td> {item.event} </td>
                        <td> {item.location} </td>
                        <td><Button style={{ fontSize: '10px', backgroundColor: "red", color: "white" }}>X</Button></td>
                    </tr>
                ))}
            </tbody>

            {selectedItem && (
                <TableModal selectedItem={selectedItem} handleCloseModal={handleCloseModal} />
            )}
        </>
    );
}
