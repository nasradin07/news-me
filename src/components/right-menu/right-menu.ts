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
export class RightMenuComponent {
  @Input() content;
  menuPages: Array<{title: string, component: any}>;
  isUserLoggedIn: boolean;
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
    this.isUserLoggedIn = this._userProvider.isUserLoggedIn();
  }
 
  openPage(page) {
    this._changePageProvidder.changePage(page.component);
  }
}
