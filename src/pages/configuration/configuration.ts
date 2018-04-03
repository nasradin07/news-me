import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ConfigurationProvider } from '../../providers/configuration';

@Component({
  selector: 'page-configuration',
  templateUrl: 'configuration.html',
})
export class ConfigurationPage {
  userPreferedTheme: string;
  themes: any = ['bela', 'crna'];

  newsCategories: any = ['sport', 'zdravlje'];
  userPreferedCategories: any;

  newsSource: any = ['bbc', 'cnn'];
  userPreferedNewsSource: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _configurationProvider: ConfigurationProvider
  ) {
  }

  ionViewDidLoad() {
  }

  public sendUserConfiguration() {
    this._configurationProvider.sendConfiguration({
      themes: this.userPreferedTheme,
      categories: this.userPreferedCategories,
      sources: this.userPreferedNewsSource
    });
  }

  public cancel() {
    console.log('Canceling');
  }



}
