import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import { InitialConfigurationProvider } from '../../providers/initial-configuration';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-spinner',
  templateUrl: 'spinner.html',
})
export class SpinnerPage {
  _subscriptions: Subscription[] = [];
  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private _initialConfigurationProvider: InitialConfigurationProvider
  ) {
  }

  ionViewDidLoad() {
    this._subscribeToInitialCOnfigurationFetchEvent();
  }

  private _subscribeToInitialCOnfigurationFetchEvent() {
    this._subscriptions.push(
      this._initialConfigurationProvider.initialConfigurationFetchEvent$.subscribe(
        notification => {
          if (notification === true) {
            this.navCtrl.setRoot(HomePage, {name: 'top-headlines'});
          }
        }
      )
    )
  }

  ionViewWillLeave() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
