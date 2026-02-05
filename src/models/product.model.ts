import { Schema, model } from "mongoose";
import type { ProductType } from '@shared-types/product.types.ts'

const productSchema = new Schema<ProductType>(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
            minLength: 5,
            maxLength: 50
        },
        description: {
            type: String,
            required: [true, "Fill description of product"],
        },
        price: {
            type: Number,
            required: [true, "Price must be more than 0"],
            min: 0,
        },
        stock: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },
        category: {
            type: String,
            required: [true, "Category of this product is required"],
        },
        images: [
            {
                type: String,
                required: [true, "Images for products must be is required"],
                default: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500"
            },
        ],
        averageRating: {
            type: Number,
            min: 0,
            max: 5,
            default: 0,
        },
        totalReviews: {
            type: Number,
            default: 0,
        },
    },{ timestamps: true }
);
const Product = model<ProductType>('Product', productSchema);

export default Product;