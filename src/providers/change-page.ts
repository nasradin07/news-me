import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { MenuController } from 'ionic-angular';


@Injectable()
export class ChangePageProvider {

  private _changePage = new Subject();
  public changePageEvent$ = this._changePage.asObservable();

  private _toggleReplacementList = new Subject();
  public toggleReplacementList$ = this._toggleReplacementList.asObservable();

  constructor(
    private _menuCtrl: MenuController
  ) {
  }

  public changePage(page, params?) {
    if ( params === undefined) {
    this._changePage.next({ page: page});
    } else {
      this._changePage.next({ page: page, params: params})
    }
  }

  public openMenu(event) {
    if (Math.abs(event.overallVelocityX) < 0.3 ) {
      return;
    }
    if (event.deltaX > 0) {
      this._menuCtrl.open('left');
    } else if(event.deltaX < 0) {
      this._menuCtrl.open('right');
    }
  }

  public closeReplacementList() {
    this._toggleReplacementList.next(false);
  } 

}
