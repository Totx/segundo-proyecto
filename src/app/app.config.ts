import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ContactoServiceInterface } from './services/contacto.service.interface';
import { ContactoService } from './services/contacto.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide: ContactoServiceInterface, useClass: ContactoService },
  ],
};
