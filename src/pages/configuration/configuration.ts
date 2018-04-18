import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ConfigurationProvider } from '../../providers/configuration';
import { CacheProvider } from '../../providers/cache';

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
  configuration: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _configurationProvider: ConfigurationProvider,
    private _cacheProvider: CacheProvider
  ) {
  }

  ionViewDidLoad() {
    this.getClientConfiguration();
    this._configurationProvider.getConfigurationOptions();
  }

  public getClientConfiguration() {
    this.configuration = this._configurationProvider.getClientConfiguration();
    console.log(this.configuration);
  }

  public sendUserConfiguration() {
    this._configurationProvider.sendConfiguration({
      themes: this.userPreferedTheme,
      categories: this.userPreferedCategories,
      sources: this.userPreferedNewsSource
    });
  }

  public clearCache() {
    this._cacheProvider.clearCache();
  }

  public cancel() {
    console.log('Canceling');
  }



}
