import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ChangePageProvider } from '../../providers/change-page';

@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _changePageProvider: ChangePageProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

  public closeReplacementList() {
    this._changePageProvider.closeReplacementList();
  }

}
