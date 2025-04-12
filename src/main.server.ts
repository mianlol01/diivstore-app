import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { authInterceptor } from './app/interceptors/auth.interceptor';

export default function () {
    return bootstrapApplication(AppComponent, {
        providers: [
            provideRouter(routes),
            provideHttpClient(withFetch(), withInterceptors([authInterceptor]))
        ]
    });
}