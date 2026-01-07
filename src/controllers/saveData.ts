import Data from '../models/data.model.ts';
import type { DataType } from '../types/data.types.ts';

export const saveDataToMongodb = async (data: DataType) => {
    try {
        const newData: DataType = new Data(data)
        await newData.save();
        console.log(`Data saved to MongoDB with timestamp ==> ${data.timestamp}`);
    } catch (error) {
        console.error("Error saving simple data to MongoDB:", error);
        throw error;
    }
};