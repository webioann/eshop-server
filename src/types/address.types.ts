// 
export interface AddressType  {
    label: string;
    fullName: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    phoneNumber: string;
    isDefault: boolean;
};

export type ShippingAddressType = Omit<AddressType, "label" | "isDefault">;