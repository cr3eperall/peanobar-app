import { ProductDTO } from './ProductDTO';
export interface OrderDTO{
    "id": number,
        total : number;
        owner : string;
        madeAt : string;
        status : OrderStatus;
        contents :OrderItem[];
}

export interface OrderItem{
    id:number;
    product : ProductDTO;
    quantity: number;
}

export enum OrderStatus{
    IN_CART="IN_CART",
    IN_PROGRESS="IN_PROGRESS",
    COMPLETED="COMPLETED"
}