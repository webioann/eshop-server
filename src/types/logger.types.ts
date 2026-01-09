import mongoose from 'mongoose';

// event variants 
type eventId = "error" | "warning" | "success";
// server events logger type
export interface LoggerDataType { 
    id: mongoose.Types.ObjectId
    timestamp: Date;
    formatted_timestamp: string;
    event_id: eventId;
    message: string;
};
// props type for params dropdown to Logger function
export type LoggerPropsType = {
    event_id: eventId;
    message: string;
};