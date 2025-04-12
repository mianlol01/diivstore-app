import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../../models/producto.model';
import { ProductoService } from '../../../../services/producto.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabla',
  imports: [CommonModule],
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.css'
})
export class TablaComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private productoService: ProductoService) { }
  ngOnInit(): void {
    this.productoService.listarProductos().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (err) => {
        console.error('Error al cargar productos', err);
      }
    });
  }
}