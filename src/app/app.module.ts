import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';

// PAGES  
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegistrationPage } from '../pages/registration/registration';
import { HistoryPage } from '../pages/history/history';
import { ConfigurationPage } from '../pages/configuration/configuration';
import { CategoryPage } from '../pages/category/category';

// COMPONENTS
import { HeaderComponent } from '../components/header/header';
import { SearchComponent } from '../components/search/search';
import { LeftMenuComponent } from '../components/left-menu/left-menu';
import { RightMenuComponent } from '../components/right-menu/right-menu';
// PROVIDERS
import { LoginProvider } from '../providers/login/login';
import { RegisterProvider } from '../providers/register/register';
import { ValidationProvider } from '../providers/validation/validation';
import { ConfigurationProvider } from '../providers/configuration/configuration';
import { HistoryProvider } from '../providers/history/history';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegistrationPage,
    HistoryPage,
    ConfigurationPage,
    HeaderComponent,
    SearchComponent,
    CategoryPage,
    LeftMenuComponent,
    RightMenuComponent
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
    LoginPage,
    RegistrationPage,
    HistoryPage,
    ConfigurationPage,
    HeaderComponent,
    SearchComponent,
    CategoryPage,
    LeftMenuComponent,
    RightMenuComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginProvider,
    RegisterProvider,
    ValidationProvider,
    ConfigurationProvider,
    HistoryProvider
  ]
})
export class AppModule {}
