import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { IMAGE_CONFIG } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideHttpClient(withFetch()), provideToastr({
    positionClass: 'toast-top-center'
  }), provideAnimations(),
  {
    provide: IMAGE_CONFIG,
    useValue: {
      disableImageSizeWarning: true,
      disableImageLazyLoadWarning: true
    }
  },
  ]
};

