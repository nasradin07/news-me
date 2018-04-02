import { Component, Input } from '@angular/core';

import { LeftMenuProvider } from '../../providers/left-menu/left-menu';
import { ChangePageProvider } from '../../providers/change-page/change-page';
import { NewsProvider } from '../../providers/news/news'; 

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
    private _changePageProvider: ChangePageProvider,
    private _newsProvider: NewsProvider
  ) {
    this._subscibeToSourcesFetchEvent();
  }


  private _subscibeToSourcesFetchEvent() {
    this._leftMenuProvider.sourcesFetchEvent$.subscribe(
      sources => {
        this.sources = sources;
        this.sortSourcesByNewsNumber();
      });
  }

  public sortSourcesByNewsNumber() {
    const newsBySource = this._newsProvider.newsBySource;
    this.sources.sort( (source1, source2) => {
      return newsBySource[source2].length - newsBySource[source1].length;
    });
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
