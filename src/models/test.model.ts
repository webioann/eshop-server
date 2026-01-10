import mongoose from 'mongoose';
import type { TestDataType } from '../types/mongodb.types.ts';

const testSchema = new mongoose.Schema<TestDataType>({
    data: { 
        type: String, 
        required: [ true, 'Data is required' ],
    },
    message: { 
        type: String, 
        required: [ true, 'Message is required' ],
    }
});
const Test = mongoose.model<TestDataType>('Test', testSchema);
export default Test;
