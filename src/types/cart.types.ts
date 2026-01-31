
export interface CartItemType {
    productId: string;
    quantity: number;
}

export interface CartType {
    userId: string;
    carItemsList: CartItemType[];
    createdAt: Date;
}
