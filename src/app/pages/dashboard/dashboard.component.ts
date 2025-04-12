import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  isSidebarHidden = false; // Controla si el sidebar está oculto
  usuario: Usuario | null = null;

  toggleSidebar(): void {
    this.isSidebarHidden = !this.isSidebarHidden; // Alterna el estado del sidebar
  }

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
  ) { }
  mensajeLogout: string | null = null;

  onLogout(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout(); // Lógica para cerrar sesión
        window.location.reload();
        Swal.fire('Cerraste sesión', '', 'success');
      }
    });
  }
  ngOnInit(): void {
    this.usuarioService.obtenerUsuario().subscribe({
      next: (data) => {
        this.usuario = data;
        console.log('Usuario:', this.usuario);
      },
      error: (err) => {
        console.error('Error al obtener usuario:', err);
      }
    });
  }

}