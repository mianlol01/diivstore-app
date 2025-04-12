import { Categoria } from './categoria.model'; // Ajusta la ruta según tu proyecto

export class Producto {
    id: number;
    descripcion: string;
    stock: number;
    precio: number;
    descuento: number;
    categoria: Categoria;

    constructor(
        id: number,
        descripcion: string,
        stock: number,
        precio: number,
        descuento: number,
        categoria: Categoria
    ) {
        this.id = id;
        this.descripcion = descripcion;
        this.stock = stock;
        this.precio = precio;
        this.descuento = descuento;
        this.categoria = categoria;
    }
}