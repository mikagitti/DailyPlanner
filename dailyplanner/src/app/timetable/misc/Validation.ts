import { z } from "zod";
import DOMPurify from "dompurify";

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
     const sanitizedData = sanitizeData(formData);
     const validationResult = meetingSchema.safeParse(sanitizedData);

     if (!validationResult.success) {
          const errorMessages = validationResult.error.format();

          setErrors({
               event: validationResult.error.errors.find(
                    (err) => err.path[0] === "event"
               )
                    ? errorMessages.event?._errors[0]
                    : undefined,
               location: validationResult.error.errors.find(
                    (err) => err.path[0] === "location"
               )
                    ? errorMessages.location?._errors[0]
                    : undefined,
               date: validationResult.error.errors.find(
                    (err) => err.path[0] === "date"
               )
                    ? errorMessages.date?._errors[0]
                    : undefined,
               time: validationResult.error.errors.find(
                    (err) => err.path[0] === "time"
               )
                    ? errorMessages.time?._errors[0]
                    : undefined,
          });
          return false;
     } else {
          setErrors({});
          return true;
     }
}

const sanitizeData = (data: MeetingFormDataType): MeetingFormDataType => {
     const sanitizedFormData = {
          id: DOMPurify.sanitize(data.id),
          event: DOMPurify.sanitize(data.event),
          location: DOMPurify.sanitize(data.location),
          date: DOMPurify.sanitize(data.date),
          time: DOMPurify.sanitize(data.time),
     };

     return sanitizedFormData;
};
