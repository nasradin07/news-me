import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { MenuController, Platform } from 'ionic-angular';


@Injectable()
export class ChangePageProvider {

  private _changePage = new Subject();
  public changePageEvent$ = this._changePage.asObservable();

  private _toggleReplacementList = new Subject();
  public toggleReplacementList$ = this._toggleReplacementList.asObservable();

  constructor(
    private _menuCtrl: MenuController,
    private _platform: Platform
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
    const platformWidth = this._platform.width();
    if (Math.abs(event.overallVelocityX) < 0.2 || platformWidth/8 > event.deltaX) {
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
