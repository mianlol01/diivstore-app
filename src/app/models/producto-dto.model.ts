export class ProductoDTO {
    descripcion: string;
    stock: number;
    precio: number;
    descuento: number;
    idCategoria: number;

    constructor(
        descripcion: string,
        stock: number,
        precio: number,
        descuento: number,
        idCategoria: number
    ) {
        this.descripcion = descripcion;
        this.stock = stock;
        this.precio = precio;
        this.descuento = descuento;
        this.idCategoria = idCategoria;
    }
}