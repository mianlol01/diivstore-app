import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { ProductoService } from '../../../../services/producto.service';
import { Producto } from '../../../../models/producto.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductoDTO } from '../../../../models/producto-dto.model';
import { ReactiveFormsModule } from '@angular/forms';
import { Categoria } from '../../../../models/categoria.model';

@Component({
  selector: 'app-producto-detalle',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css']
})
export class ProductoDetalleComponent implements OnInit {
  producto!: Producto;
  form!: FormGroup;
  modoEdicion: boolean = false;
  categorias: Categoria[] = [];

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productoService.obtenerProductoPorId(id).subscribe({
      next: (data) => {
        this.producto = data;
        this.inicializarFormulario();
      },
      error: (err) => console.error('Producto no encontrado', err)
    });
    this.productoService.obtenerCategorias().subscribe({
      next: (data) => this.categorias = data,
      error: (err) => console.error('Error al cargar categorías', err)
    });
  }
  inicializarFormulario() {
    this.form = this.fb.group({
      id: [{ value: this.producto.id, disabled: true }],
      descripcion: [{ value: this.producto.descripcion, disabled: true }],
      stock: [{ value: this.producto.stock, disabled: true }],
      precio: [{ value: this.producto.precio, disabled: true }],
      descuento: [{ value: this.producto.descuento, disabled: true }],
      idCategoria: [{ value: this.producto.categoria.id, disabled: true }]
    });
  }

  habilitarFormulario() {
    this.modoEdicion = true;
    Object.keys(this.form.controls).forEach(campo => {
      if (campo !== 'id') {
        this.form.get(campo)?.enable();
      }
    });
  }

  guardarCambios() {
    if (this.form.invalid) return;

    const dto: ProductoDTO = {
      descripcion: this.form.value.descripcion,
      stock: this.form.value.stock,
      precio: this.form.value.precio,
      descuento: this.form.value.descuento,
      idCategoria: this.form.value.idCategoria
    };

    this.productoService.actualizarProducto(this.producto.id, dto).subscribe({
      next: () => {
        console.log('Producto actualizado');
        window.location.reload(); // 🔁 Recarga la página después del guardado
      },
      error: (err) => console.error('Error al actualizar producto', err)
    });
  }
}