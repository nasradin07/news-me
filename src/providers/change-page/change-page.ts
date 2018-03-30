import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class ChangePageProvider {

  private _changePage = new Subject();
  public changePageEvent$ = this._changePage.asObservable();

  constructor() {
  }

  public changePage(page, params?) {
    if ( params === undefined) {
    this._changePage.next({ page: page});
    } else {
      this._changePage.next({ page: page, params: params})
    }
  }

}
