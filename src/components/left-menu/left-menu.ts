import { Component, Input } from '@angular/core';

import { LeftMenuProvider } from '../../providers/left-menu/left-menu';
import { ChangePageProvider } from '../../providers/change-page/change-page';

import { SourceNewsPage } from '../../pages/source-news/source-news'
@Component({
  selector: 'left-menu',
  templateUrl: 'left-menu.html'
})
export class LeftMenuComponent {
  @Input() content;
  sources: any;

  constructor(
    private _leftMenuProvider: LeftMenuProvider,
    private _changePageProvider: ChangePageProvider
  ) {
    this._subscibeToSourcesFetchEvent();
  }


  private _subscibeToSourcesFetchEvent() {
    this._leftMenuProvider.sourcesFetchEvent$.subscribe(
      sources => {
        this.sources = sources;
      }
    );
  }

  public goToSource(source) {
    const params = {
      source: source
    };
    this._changePageProvider.changePage(SourceNewsPage, params);
  }

  ionViewWillLeave() {
  
  }

}
