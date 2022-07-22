import { OrderDTO } from './OrderDTO';
export interface UserDTO{
    uuid: string,
    fullName: string,
    username: string,
    email: string,
    role: {
        id: number,
        name: string
    },
    balance: number,
    classroom: number,
    cartOrder: OrderDTO,
    orderInProgress: boolean
}