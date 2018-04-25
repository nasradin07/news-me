import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Footer } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { CacheModule } from 'ionic-cache';
import { InAppBrowser } from '@ionic-native/in-app-browser';

// PAGES  
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegistrationPage } from '../pages/registration/registration';
import { HistoryPage } from '../pages/history/history';
import { ConfigurationPage } from '../pages/configuration/configuration';
import { CategoryPage } from '../pages/category/category';
import { SourceNewsPage } from '../pages/source-news/source-news';
import { SpinnerPage } from '../pages/spinner/spinner';
import { SingleArticlePage } from '../pages/single-article/single-article';

// COMPONENTS
import { HeaderComponent } from '../components/header/header';
import { SearchComponent } from '../components/search/search';
import { LeftMenuComponent } from '../components/left-menu/left-menu';
import { RightMenuComponent } from '../components/right-menu/right-menu';
import { NewsComponent } from '../components/news/news';
import { FooterComponent } from '../components/footer/footer';

// PROVIDERS
import { LoginProvider } from '../providers/login';
import { RegisterProvider } from '../providers/register';
import { ValidationProvider } from '../providers/validation';
import { ConfigurationProvider } from '../providers/configuration';
import { HistoryProvider } from '../providers/history';
import { ChangePageProvider } from '../providers/change-page';
import { NewsProvider } from '../providers/news';
import { NewsFilterProvider } from '../providers/news-filter';
import { LeftMenuProvider } from '../providers/left-menu';
import { InitialConfigurationProvider } from '../providers/initial-configuration';
import { UserProvider } from '../providers/user';
import { StorageProvider } from '../providers/storage';
import { LikeProvider } from '../providers/like';
import { CacheProvider } from '../providers/cache';
import { RefreshProvider } from '../providers/refresh';

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
    RightMenuComponent,
    NewsComponent,
    SourceNewsPage,
    SpinnerPage,
    SingleArticlePage,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    CacheModule.forRoot()
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
    RightMenuComponent,
    NewsComponent,
    SourceNewsPage,
    SpinnerPage,
    SingleArticlePage,
    FooterComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    InAppBrowser,
    LoginProvider,
    RegisterProvider,
    ValidationProvider,
    ConfigurationProvider,
    HistoryProvider,
    ChangePageProvider,
    NewsProvider,
    NewsFilterProvider,
    LeftMenuProvider,
    InitialConfigurationProvider,
    UserProvider,
    StorageProvider,
    LikeProvider,
    CacheProvider,
    RefreshProvider
  ]
})
export class AppModule {}
