export type scheduleType = {
     date: Date;
     event: string;
     location: string;
     id?: number;
};

export interface TableBuilderProps {
     scheduleData: scheduleType[];
}
