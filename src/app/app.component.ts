import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import { LoginPage } from '../pages/login/login';
import { RegistrationPage } from '../pages/registration/registration';
import { HistoryPage } from '../pages/history/history';
import { ConfigurationPage } from '../pages/configuration/configuration';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  leftMenuPages: Array<{title: string, component: any}>;
  rightMenuPages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.leftMenuPages = [
      { title: 'Home', component: HomePage }    
    ];
    this.rightMenuPages = [
      { title: 'Login', component: LoginPage },
      { title: 'Registration', component: RegistrationPage },
      { title: 'History', component: HistoryPage },
      { title: 'Configuration', component: ConfigurationPage }
    ]
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }
}
