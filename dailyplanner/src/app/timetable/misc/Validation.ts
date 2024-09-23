import { z } from "zod";

const meetingSchema = z.object({
     id: z.string().uuid({ message: "Invalid meeting id" }),
     event: z.string().min(1, { message: "Event name is required" }),
     location: z.string().min(1, { message: "Location is required" }),
     date: z.string().refine(
          (val) => {
               return !isNaN(Date.parse(val)); // Ensure the date is in a valid format
          },
          { message: "Date is required" }
     ),
     time: z.string().refine(
          (val) => {
               // Custom time validation for "HH:MM" format (24-hour format)
               const timeRegex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
               return timeRegex.test(val);
          },
          { message: "Time is required" }
     ),
});

type MeetingFormDataType = z.infer<typeof meetingSchema>;

type validationType = {
     formData: MeetingFormDataType;
     setErrors: React.Dispatch<
          React.SetStateAction<{ [key: string]: string | undefined }>
     >;
};

export function validateMeetingData({
     formData,
     setErrors,
}: validationType): boolean {
     const result = meetingSchema.safeParse(formData);

     if (!result.success) {
          const errorMessages = result.error.format();

          setErrors({
               event: result.error.errors.find((err) => err.path[0] === "event")
                    ? errorMessages.event?._errors[0]
                    : undefined,
               location: result.error.errors.find(
                    (err) => err.path[0] === "location"
               )
                    ? errorMessages.location?._errors[0]
                    : undefined,
               date: result.error.errors.find((err) => err.path[0] === "date")
                    ? errorMessages.date?._errors[0]
                    : undefined,
               time: result.error.errors.find((err) => err.path[0] === "time")
                    ? errorMessages.time?._errors[0]
                    : undefined,
          });
          return false;
     } else {
          setErrors({});
          console.log("Meeting data is valid", result.data);
          return true;
     }
}
