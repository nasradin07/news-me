import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ConfigurationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConfigurationProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ConfigurationProvider Provider');
  }

  public sendConfiguration(configuration) {
    console.log('Sending configuration', configuration);
  }

}
