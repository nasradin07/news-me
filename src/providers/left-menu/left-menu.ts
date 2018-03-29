import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
@Injectable()
export class LeftMenuProvider {
  private _sendSources = new Subject();
  public sourcesFetchEvent$ = this._sendSources.asObservable();

  sources: any;
  constructor() {
    
  }

  public sendSourcesToLeftMenu(sources) {
    this.sources = sources;
    this._sendSources.next(Object.keys(sources));
  }

}
