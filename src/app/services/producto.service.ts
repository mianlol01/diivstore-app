import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model'; // Ajusta si tu ruta es distinta
import { ProductoDTO } from '../models/producto-dto.model';
import { Categoria } from '../models/categoria.model'; // Ajusta si tu ruta es distinta

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrl = 'http://localhost:8080/productos';

  constructor(private http: HttpClient) { }

  listarProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/listar`);
  }
  crearProducto(dto: ProductoDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear`, dto);
  }

  actualizarProducto(id: number, dto: ProductoDTO): Observable<any> {
    return this.http.put(`${this.apiUrl}/actualizar/${id}`, dto);
  }
  obtenerProductoPorId(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }
  obtenerCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}/categorias`);
  }
}
