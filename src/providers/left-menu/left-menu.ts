import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
@Injectable()
export class LeftMenuProvider {
  private _sendSources = new Subject();
  public sourcesFetchEvent$ = this._sendSources.asObservable();

  private _showNews = new Subject();
  public showNewsForSourceFetchEvent = this._showNews.asObservable();

  constructor() {
    
  }

  public sendSourcesToLeftMenu(sources) {
    this._sendSources.next(sources);
  }

  public notifyLeftMenuToShowNewsForSource(source) {
    this._showNews.next(source);
  }

}
