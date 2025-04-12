import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoginRequest } from '../models/login-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) { }

  private authStatus = new BehaviorSubject<boolean>(this.hasToken());
authStatus$ = this.authStatus.asObservable();

  autenticar(loginRequest: LoginRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, loginRequest).pipe(
      tap((response: any) => {
        localStorage.setItem('authToken', response.token);
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let mensaje = 'No se pudo conectar con el servidor. Inténtalo más tarde.';

    if (error.error instanceof ErrorEvent) {
      console.error('Ocurrió un error:', error.error.message);
    } else {
      console.error(`Error ${error.status}:`, error.error);

      // Si el backend envía un mensaje en error.errors
      if (error.status === 400 || error.status === 401) {
        if (error.error?.errors && Array.isArray(error.error.errors)) {
          mensaje = error.error.errors.join(', ');
        } else if (typeof error.error === 'string') {
          mensaje = error.error;
        }
      }
    }

    return throwError(() => new Error(mensaje));
  }

  // Obtener el token almacenado
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Eliminar el token (logout)
  logout(): void {
    localStorage.removeItem('authToken');
  }
  hasToken(): boolean {
  return !!localStorage.getItem('authToken');
}
}
