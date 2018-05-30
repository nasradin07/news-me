import { Component, Input } from '@angular/core';

import {ChangePageProvider } from '../../providers/change-page'

@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent  {

  @Input() name;

  constructor(
    private _changePageProvider: ChangePageProvider
  ) {
  }

  public closeReplacementList() {
    this._changePageProvider.closeReplacementList();
  }


}
