import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../models/producto.model';
import { ProductoService } from '../../../services/producto.service'; // Ajusta la ruta según tu estructura de carpetas
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-productos',
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
}
