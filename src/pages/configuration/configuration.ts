import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import { ConfigurationProvider } from '../../providers/configuration';
import { CacheProvider } from '../../providers/cache';

@Component({
  selector: 'page-configuration',
  templateUrl: 'configuration.html',
})
export class ConfigurationPage {
  private _subscription: Subscription[] = [];

  themes: any = ['light', 'dark'];
  allNewsCategories: any;

  userConfiguration: any = {
    colorTheme: null,
    notificationsEnabled: null,
    weatherEnabled: null,
    cryptocurrencyCheckerEnabled: null,
    transportationCheckerEnabled: null,
    mainMenuOptions: []
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _configurationProvider: ConfigurationProvider,
    private _cacheProvider: CacheProvider,
    private _changeDetectRef: ChangeDetectorRef,
    private _alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad() {
    this.allNewsCategories = this.getAllNewsCategories();
    this.userConfiguration.mainMenuOptions= this.getUserChoosenNewsCategories();
  }

  public getAllNewsCategories() {
    return this._configurationProvider.getAllCategories();
  }

  public getUserChoosenNewsCategories() {
    return this._configurationProvider.getNewsCategories();
  }

  public sendUserConfiguration() {
    let length = this.userConfiguration.mainMenuOptions.length;
    if (length !== 5) {
      this.alertUser(length);
    } else {
      let configuration = this.makeConfigurtionObj();
      this._configurationProvider.sendUserConfigurationToServer(configuration);
      this._configurationProvider.setUserNewsCategories(configuration['mainMenuOptions']);
    }
  }

  public alertUser(length) {
    this._alertCtrl.create({
      title: 'You must choose 5 categories',
      subTitle: `You currently have ${this.userConfiguration.mainMenuOptions.length} choosen`,
      buttons: ['Dismiss']
    }).present();
  }

  public makeConfigurtionObj() {
    const configuration = {};
    if (this.userConfiguration['weatherEnabled'] != null) {
      configuration['weatherEnabled'] = this.getOptionValue(this.userConfiguration['weatherEnabled']);
    }
    if (this.userConfiguration['notificationsEnabled'] != null) {
      configuration['notificationsEnabled'] = this.getOptionValue(this.userConfiguration['notificationEnabled']);
    }
    if(this.userConfiguration['cryptocurrencyCheckerEnabled'] != null) {
      configuration['cryptocurrencyCheckerEnabled'] = this.getOptionValue(this.userConfiguration['cryptocurrencyCheckerEnabled']);
    }
    if (this.userConfiguration['transportationCheckerEnabled'] != null) {
      configuration['transportationCheckerEnabled'] = this.getOptionValue(this.userConfiguration['transportationCheckerEn']);
    }
    if (this.userConfiguration.colorTheme != null) { 
      configuration['colorTheme'] = this.userConfiguration.colorTheme;
    }
    configuration['mainMenuOptions'] = this.userConfiguration.mainMenuOptions;
    return configuration;
  }

  public getOptionValue(option) {
    if (option === 'true') return true;
    else return false;
  }

  public cancel() {
  }

  public clearCache() {
    this._cacheProvider.clearCache();
  }

  ionViewDidLeave() {
    this._subscription.forEach(subscription => subscription.unsubscribe());
    this._changeDetectRef.detach();
  }



}
