export function formatDate(date: Date): string {
     const year = date.getFullYear();
     const month = (date.getMonth() + 1).toString().padStart(2, "0");
     const day = date.getDate().toString().padStart(2, "0");
     return `${day}.${month}.${year}`;
}

export function getWeekday(date: Date): string {
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
