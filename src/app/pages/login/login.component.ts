import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/login-request';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginRequest: LoginRequest = {
    username: '', password: ''
  };
  errorMessage: string | null = null;
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    this.isLoading = true;
  
    this.authService.autenticar(this.loginRequest).subscribe({
      next: (response) => {
        console.log('Autenticación exitosa:', response);
        this.errorMessage = null;
        this.isLoading = false;
  
        // Redirigir al dashboard
        this.router.navigate(['/dashboard/inicio']);
      },
      error: (err) => {
        console.error('Error de autenticación:', err.message);
        this.errorMessage = err.message;
        this.isLoading = false;
      }
    });
  }
}