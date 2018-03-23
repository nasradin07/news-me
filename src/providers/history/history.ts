import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class HistoryProvider {

  constructor(public http: HttpClient) {
    console.log('Hello HistoryProvider Provider');
  }

}
