import mongoose from 'mongoose'
import type { DataType } from '../types/user.types.ts'

const dataSchema = new mongoose.Schema<DataType>(
    {
        data: { 
            type: String, 
            required: [ true, 'Data is required' ],
        },
        timestamp: { 
            type: Date, 
            required: [ true, 'Timestamp is required' ],
        }
})
const Data = mongoose.model<DataType>('Data', dataSchema);

export default Data;