export function modifyToHHMMSS(time) {
     const datetime = new Date(time);
     const formattedHHMMSS = datetime.toTimeString().split(" ")[0]; // Format as HH:MM:SS
     return formattedHHMMSS;
}
