import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';

// PAGES  
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HeaderPage } from '../pages/header/header';
import { LoginPage } from '../pages/login/login';
import { RegistrationPage } from '../pages/registration/registration';
import { HistoryPage } from '../pages/history/history';
import { ConfigurationPage } from '../pages/configuration/configuration';

// PROVIDERS
import { LoginProvider } from '../providers/login/login';
import { RegisterProvider } from '../providers/register/register';
import { ValidationProvider } from '../providers/validation/validation';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    HeaderPage,
    LoginPage,
    RegistrationPage,
    HistoryPage,
    ConfigurationPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    HeaderPage,
    LoginPage,
    RegistrationPage,
    HistoryPage,
    ConfigurationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginProvider,
    RegisterProvider,
    ValidationProvider
  ]
})
export class AppModule {}
