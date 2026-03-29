export interface User {
    id: string;
    name: string;
    address: string;
    phoneNumber: string;
}


export interface Product {
    id: number;
    name: string;
    quantity: string;
    unitPrice: number;
    imageUrl?: string;
}