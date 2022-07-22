export interface ProductDTO{
    id: number;
    name: string;
    cost: number;
    img: number;
    type: ProductType;
}

export enum ProductType{
    PANINO,
    BIBITA,
    DOLCE
}