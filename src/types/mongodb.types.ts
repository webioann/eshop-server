import mongoose from 'mongoose';
// collections on MongoDB eshop-db database
export type MongodbCollectionList = "users" | "logger" | "products";

export interface TestDataType { 
    id: mongoose.Types.ObjectId
    data: string;
    message: string;
};
