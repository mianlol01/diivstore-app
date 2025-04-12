import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  obtenerUsuario(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/usuario/datos`);
  } 

}
