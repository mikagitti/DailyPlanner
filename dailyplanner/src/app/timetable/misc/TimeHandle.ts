//Format the time to a string with the format "dd.mm.yyyy"
export function formatDate(date: Date): string {
     const modifiedDate = new Date(date);
     const year = modifiedDate.getFullYear();
     const month = (modifiedDate.getMonth() + 1).toString().padStart(2, "0");
     const day = modifiedDate.getDate().toString().padStart(2, "0");

     return `${day}.${month}.${year}`;
}

/// Get the weekday from a given date
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

     const modifiedDate = new Date(date);
     const dayIndex = modifiedDate.getDay();
     const weekday = modifiedDate.toLocaleDateString("fi-FI", {
          weekday: "long",
     });

     return weekday;
}

export function getDigitalTime(date: Date): string {
     const modifiedDate = new Date(date);

     const localTime = modifiedDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
     });

     return localTime;
}
