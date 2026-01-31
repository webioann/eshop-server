import { AuthProviderType } from './user.types.ts';
import { ShippingAddressType } from './address.types.ts';

export interface OrderItemType {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    image: string;
}

export interface OrderType {
    userId: string;
    provider: AuthProviderType;
    orderItemsList: OrderItemType[];
    shippingAddress: ShippingAddressType;
    paymentStatus: string;
    totalPrice: number;
    status: "pending" | "shipped" | "delivered";
    deliveredAt: Date;
    shippedAt: Date;
}
