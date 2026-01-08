import { format } from 'date-fns';
import { EventEmitter } from 'events';
import Logger from '../models/logger.model.ts';
import type { LoggerDataType, LoggerPropsType } from '../types/logger.types.ts';

const EventEmitterLogger = async ({event_id, message}: LoggerPropsType) => {
    class MyEmitter extends EventEmitter {};
    const eventEmitter = new MyEmitter(); 

    try {
        let eventTime = format(new Date(), 'HH:mm:ss dd-MM-yy');
        let logItem = `[${eventTime}]\t\t${event_id}\t${message}\n`;
        const loggerData: LoggerDataType = {
            formatted_timestamp: eventTime,
            event_id: event_id,
            message: message
        }
        console.log(logItem, loggerData);

        // const newData: LoggerDataType = new Logger(data)
        // await newData.save();
        // console.log(`Data saved to MongoDB with timestamp ==> ${data.timestamp}`);
    } catch (error) {
        console.error("Error in EventLoggerEmitter in time saving to MongoDB:", error);
        throw error;
    }
};
export default EventEmitterLogger;