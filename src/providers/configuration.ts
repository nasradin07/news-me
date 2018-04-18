import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { InitialConfigurationProvider } from './initial-configuration';
import { StorageProvider } from './storage';

@Injectable()
export class ConfigurationProvider {

  constructor(
    private _http: HttpClient,
    private _initialConfigurationProvider: InitialConfigurationProvider,
    private _storageProvider: StorageProvider
  ) {
    console.log('Hello ConfigurationProvider Provider');
  }

  public getConfigurationOptions() {
    const url = 'http://api-news-me.ml/public/configurations-with-options';
    this._http.get(url).subscribe(
      response => console.log(response),
      err => console.log(err)
    )
  }

  public sendConfiguration(configuration) {
    console.log('Sending configuration', configuration);
  }

  public getClientConfiguration() {
    return this._initialConfigurationProvider.clientConfiguration;
  }

  public getNumberOfNewsArticlesForLoad() {
    return this._initialConfigurationProvider.clientConfiguration['loadMoreBatch'];
  }

  public getClientNewsConfiguration() {
    let key = 'clientNewsCategories';
    return this._storageProvider.getData(key);
  }

  public saveClientNewsConfiguration(newsConfiguration) {
    let key = 'clientNewsCategories';
    return this._storageProvider.saveData(key,newsConfiguration);
  }

}
