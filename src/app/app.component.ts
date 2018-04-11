import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Spinner } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ChangePageProvider } from '../providers/change-page';
import { InitialConfigurationProvider } from '../providers/initial-configuration';
import { CacheProvider } from '../providers/cache';

import { SpinnerPage } from '../pages/spinner/spinner';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = SpinnerPage;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private _changePageProvider: ChangePageProvider,
    private _initialConfigurationProvider: InitialConfigurationProvider,
    private _cacheProvider: CacheProvider
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.listenForChangePageEvent();
      this._initialConfigurationProvider.getInitialConfiguration();
      this._cacheProvider.setDefaultTTP(5);
    });
  }

  

  public listenForChangePageEvent() {
    this._changePageProvider.changePageEvent$.subscribe(
     (page) =>  {
       this.nav.push(page['page'], page['params']);
     }
    );
  }

}
