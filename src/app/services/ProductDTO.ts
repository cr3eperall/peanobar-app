export interface ProductDTO{
    id: number;
    name: string;
    cost: number;
    img: number;
    type: ProductType;
    disabled?:boolean;
}

export enum ProductType{
    PANINO="PANINO",
    BIBITA="BIBITA",
    DOLCE="DOLCE"
}