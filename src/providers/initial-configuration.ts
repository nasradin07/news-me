import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class InitialConfigurationProvider {
  private _url: string = 'http://api-news-me.ml/public/today-news';
  allNews: any;
  clientConfiguration: any;

  private _sendNotification = new Subject();
  public initialConfigurationFetchEvent$ = this._sendNotification.asObservable();

  constructor(public http: HttpClient) {

  }
  getInitialConfiguration() {
    this.http.get(this._url)
      .subscribe(
        initialConfiguration => {
          this.allNews = initialConfiguration["newsCategories"];
          this.clientConfiguration = initialConfiguration['clientConfiguration'];
          this.sendNotification(true);
        },
        err => console.log(err)
      );
  }

  public getAllNews() {
    return this.allNews;
  }

  public sendNotification(param) {
    this._sendNotification.next(param);
  }
}
