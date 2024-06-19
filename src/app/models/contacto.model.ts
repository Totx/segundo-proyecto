import { GeneroModel } from "./genero.model";

export interface ContactoModel {
    id: number;
    documento: number;
    nombre: string;
    fechaNacimiento: Date;
    genero: GeneroModel;
}