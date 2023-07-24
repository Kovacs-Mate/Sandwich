import { Sandwich } from "./sandwich";

export interface Orders {
    status: string;
    orders: Array<Sandwich>;
}
