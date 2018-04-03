import { Component, Input } from '@angular/core';
import { LoginPage } from '../../pages/login/login';
import { RegistrationPage } from '../../pages/registration/registration';
import { HistoryPage } from '../../pages/history/history';
import { ConfigurationPage } from '../../pages/configuration/configuration';

import { ChangePageProvider } from '../../providers/change-page';

@Component({
  selector: 'right-menu',
  templateUrl: 'right-menu.html'
})
export class RightMenuComponent {
  @Input() content;
  menuPages: Array<{title: string, component: any}>;

  constructor(
    private _changePageProvidder: ChangePageProvider
  ) {
    this.menuPages = [
      { title: 'Login', component: LoginPage },
      { title: 'Registration', component: RegistrationPage },
      { title: 'History', component: HistoryPage },
      { title: 'Configuration', component: ConfigurationPage }
    ];
  }
 
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this._changePageProvidder.changePage(page.component);
  }
}
