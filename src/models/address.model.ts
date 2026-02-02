import mongoose from 'mongoose'
import { AddressType } from '@shared-types/address.types.ts'

export const addressSchema = new mongoose.Schema<AddressType>({
    label: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zipCode: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    isDefault: {
        type: Boolean,
        default: false,
    },
});
