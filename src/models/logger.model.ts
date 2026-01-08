import mongoose from 'mongoose'
import type { LoggerType } from '../types/logger.types.js'

const loggerSchema = new mongoose.Schema<LoggerType>(
    {
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
const Logger = mongoose.model<LoggerType>('Logger', loggerSchema);

export default Logger;