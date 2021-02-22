import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FooterModule } from '@components/footer/footer.module';
import { HeaderModule } from '@components/header/header.module';
import { environment } from '@environments/environment';
import { JwtInterceptor, ServerErrorInterceptor } from './@core/interceptors';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { LoadingScreenInterceptor } from '@core/interceptors/loading.interceptor';
import { SharedModule } from '@app/shared/shared.module';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SnotifyModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    HeaderModule,
    FooterModule,
    NgxWebstorageModule.forRoot(),
    SocialLoginModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingScreenInterceptor,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '686645448062-bqnisflu0a358ameteqc63ah09uc08fu.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('clientId')
          }
        ]
      } as SocialAuthServiceConfig,
    },
    {
      provide: 'SnotifyToastConfig',
      useValue: ToastDefaults
    },
    SnotifyService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
