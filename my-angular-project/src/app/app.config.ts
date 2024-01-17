import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(), provideRouter(routes), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"expr-api","appId":"1:95125095344:web:fdcb8802f3cf021d46cc75","storageBucket":"expr-api.appspot.com","apiKey":"AIzaSyAbhYWTu7lz1_OB4M_1BZHD-LdN5t1EPDM","authDomain":"expr-api.firebaseapp.com","messagingSenderId":"95125095344","measurementId":"G-1GBQYW11RS"}))), importProvidersFrom(provideAuth(() => getAuth()))]
};
