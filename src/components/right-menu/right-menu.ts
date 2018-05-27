import { Component, Input, OnInit } from '@angular/core';
import { LoginPage } from '../../pages/login/login';
import { RegistrationPage } from '../../pages/registration/registration';
import { HistoryPage } from '../../pages/history/history';
import { ConfigurationPage } from '../../pages/configuration/configuration';

import { ChangePageProvider } from '../../providers/change-page';
import { UserProvider } from '../../providers/user';

@Component({
  selector: 'right-menu',
  templateUrl: 'right-menu.html'
})
export class RightMenuComponent implements OnInit {
  @Input() content;
  menuPages: Array<{title: string, component: any}>;
  constructor(
    private _changePageProvidder: ChangePageProvider,
    private _userProvider: UserProvider
  ) {
    this.menuPages = [
      { title: 'Login', component: LoginPage },
      { title: 'Registration', component: RegistrationPage },
      { title: 'History', component: HistoryPage },
      { title: 'Configuration', component: ConfigurationPage }
    ];
  }

  ngOnInit() {

  }

 
  openPage(page) {
    this._changePageProvidder.changePage(page.component);
  }

  public hideRegistrationAndLogin(p) {
    if (p.title === 'Login' || p.title === 'Registration') {
      if (this._userProvider.isUserLoggedIn() === true) {
        return false;
      } else {
        return true;
      }
    } else{
      //console.log('truesafsa',p);
      return true;
    }
  }
}
