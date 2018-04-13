import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { InitialConfigurationProvider } from './initial-configuration';

@Injectable()
export class ConfigurationProvider {

  constructor(
    private _http: HttpClient,
    private _initialConfigurationProvider: InitialConfigurationProvider
  ) {
    console.log('Hello ConfigurationProvider Provider');
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

}
