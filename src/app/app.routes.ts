import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { InicioComponent } from './pages/dashboard/inicio/inicio.component';
import { ProductosComponent } from './pages/dashboard/productos/productos.component';
import { TablaComponent } from './pages/dashboard/productos/tabla/tabla.component';
import { ProductoDetalleComponent } from './pages/dashboard/productos/producto-detalle/producto-detalle.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [
            { path: '', redirectTo: 'inicio', pathMatch: 'full' }, // Redirige automáticamente a /dashboard/inicio
            { path: 'inicio', component: InicioComponent },
            {
                path: 'productos', component: ProductosComponent, children: [
                    { path: '', redirectTo: 'tabla', pathMatch: 'full' },
                    { path: 'tabla', component: TablaComponent },
                    {
                        path: ':id', component: ProductoDetalleComponent
                    }
                ]
            },
        ]
    },
    { path: '**', redirectTo: 'login' } // Redirige a login por defecto en caso de una ruta no válida
];