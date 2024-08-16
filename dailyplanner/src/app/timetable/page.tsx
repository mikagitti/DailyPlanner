type scheduleType = {
     date: Date;
     event: string;
     location: string;
};

const scheduleData: scheduleType[] = [
     {
          date: new Date("2021-09-20T13:00:00"),
          event: "Meeting",
          location: "Room 1",
     },
     {
          date: new Date("2021-09-20T14:30:00"),
          event: "Workshop",
          location: "Room 2",
     },
     {
          date: new Date("2021-09-20T15:30:00"),
          event: "Presentation",
          location: "Room 3",
     },
];

export default function Timetable() {
     return (
          <div style={{}}>
               <table style={{ width: "100%" }}>
                    <thead>
                         <tr style={{ textAlign: "left" }}>
                              <th>Day</th>
                              <th>Date</th>
                              <th>Time</th>
                              <th>What</th>
                              <th>Where</th>
                         </tr>
                    </thead>
                    <tbody>
                         {scheduleData.map((item, index) => (
                              <tr key={index}>
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
               </table>
          </div>
     );

     function formatDate(date: Date): string {
          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2, "0");
          const day = date.getDate().toString().padStart(2, "0");
          return `${day}.${month}.${year}`;
     }

     function getWeekday(date: Date): string {
          const days = [
               "Sunday",
               "Monday",
               "Tuesday",
               "Wednesday",
               "Thursday",
               "Friday",
               "Saturday",
          ];
          const dayIndex = date.getDay();
          return days[dayIndex];
     }
}
