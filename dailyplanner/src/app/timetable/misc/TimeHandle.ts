//Format the time to a string with the format "dd.mm.yyyy"
export function formatDate(date: Date): string {
     const modifiedDate = new Date(date);
     const year = modifiedDate.getFullYear();
     const month = (modifiedDate.getMonth() + 1).toString().padStart(2, "0");
     const day = modifiedDate.getDate().toString().padStart(2, "0");

     return `${day}.${month}.${year}`;
}

/// Get the weekday from a given date
export function getWeekdayInLanguage(
     date: Date | number,
     locale: string
): string {
     const modifiedDate = new Date(date);
     const weekday = modifiedDate.toLocaleDateString(locale, {
          weekday: "long",
     });

     return weekday;
}

/// Get the time from a given date
export function getLocalTimeFromUtc(date: Date): string {
     const modifiedDate = new Date(date);

     const localTime = modifiedDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
     });

     const formattedTime = localTime.replace(".", ":");

     return formattedTime;
}

export function splitDateTime(dateTime: Date | string) {
     const meetingDate = new Date(dateTime);
     const dateUTC = meetingDate.toISOString().split("T")[0];
     const timeUTC = meetingDate.toTimeString().split(" ")[0].substring(0, 5);
     return { dateUTC, timeUTC };
}

export function formatUtcDateTime(date: string, time: string): Date {
     let formattedDate = new Date(date);
     formattedDate.setHours(Number(time.split(":")[0]));
     formattedDate.setMinutes(Number(time.split(":")[1]));

     const utcDate = formattedDate.toISOString(); // YYYY-MM-DDTHH:mm:ss.sssZ
     return new Date(utcDate);
}
