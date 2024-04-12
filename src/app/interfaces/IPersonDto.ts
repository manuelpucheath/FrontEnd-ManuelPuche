import { IListSimpleItem } from "./IListSimpleItem";

export interface IPersonDto {
    id?: number,
    email: string,
    name: string,
    lastName: string,
    identificationType: IListSimpleItem,
    identificationNumber: string,
    concatenatedIdentification?: string,
    fullName?: string
}