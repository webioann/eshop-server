import mongoose from 'mongoose'
import type { LoggerDataType } from '../types/logger.types.ts'

const loggerSchema = new mongoose.Schema<LoggerDataType>(
    {
        timestamp: { 
            type: Date, 
            required: [ true, 'Timestamp is required' ],
        },
        formatted_timestamp: { 
            type: String, 
            required: [ true, 'Formatted timestamp is required' ],
        },
        event_id: { 
            enum: ['error', 'warning', 'success'],
            type: String,
            required: [ true, 'Event ID is required' ],
        },
        message: { 
            type: String, 
            required: [ true, 'Message is required' ],
        }
})
const Logger = mongoose.model<LoggerDataType>('Logger', loggerSchema);

export default Logger;