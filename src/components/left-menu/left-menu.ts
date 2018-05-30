import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { LeftMenuProvider } from '../../providers/left-menu';
import { ChangePageProvider } from '../../providers/change-page';
import { NewsProvider } from '../../providers/news'; 

import { SourceNewsPage } from '../../pages/source-news/source-news'
import { SingleArticlePage } from '../../pages/single-article/single-article';
@Component({
  selector: 'left-menu',
  templateUrl: 'left-menu.html'
})
export class LeftMenuComponent {
  @Input() content;
  showSources = false;
  showNews = false;
  sources: any;
  news;
  _subscriptions: Subscription[] = [];
  constructor(
    private _leftMenuProvider: LeftMenuProvider,
    private _changePageProvider: ChangePageProvider,
    private _newsProvider: NewsProvider
  ) {
    this._subscibeToSourcesFetchEvent();
    this._subscribeForShowNewsForSourceFetchEvent();
  }


  private _subscibeToSourcesFetchEvent() {
    this._subscriptions.push(
      this._leftMenuProvider.sourcesFetchEvent$.subscribe(
        sources => {
          this.sources = sources;
          this.sortSourcesByNewsNumber();
          this.showSourceHideNews();
        })
      );
  }

  private _subscribeForShowNewsForSourceFetchEvent() {
    this._subscriptions.push(
      this._leftMenuProvider.showNewsForSourceFetchEvent.subscribe(
        source => {
          this.news = this._newsProvider.getNewsBySource(source);
          this.showNewsHideSources();
        }
      )
    );
  }

  public showSourceHideNews() {
    this.showNews = false;
    this.showSources = true;
  }

  public showNewsHideSources() {
    this.showNews = true;
    this.showSources = false;
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

  public showArticle(article) {
    const params = {
      article: article
    };
    this._changePageProvider.changePage(SingleArticlePage, params);
  }

  public closeReplacementList() {
    this._changePageProvider.closeReplacementList();
  }

  ionViewWillLeave() {
    this._subscriptions.forEach( subscription => subscription.unsubscribe());
  }

}
