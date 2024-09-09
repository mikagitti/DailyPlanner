export type scheduleType = {
     date: Date;
     event: string;
     location: string;
};

export interface TableBuilderProps {
     scheduleData: scheduleType[];
}
