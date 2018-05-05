import { Component, ChangeDetectorRef } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { NewsProvider } from '../../providers/news';
import { CacheProvider } from '../../providers/cache';
import { ConfigurationProvider } from '../../providers/configuration';
import { ChangePageProvider } from '../../providers/change-page'; 

@Component({
  selector: 'page-source-news',
  templateUrl: 'source-news.html',
})
export class SourceNewsPage {
  newsInSource: any;
  source: string;
  newsForDisplay;
  currIndex = 0;
  loadMoreArticlesNum: number;

  constructor(
    private _navParams: NavParams,
    private _newsProvider: NewsProvider,
    private _cacheProvider: CacheProvider,
    private _configurationProvider: ConfigurationProvider,
    private _changePageProvider: ChangePageProvider,
    private _changeDetectRef: ChangeDetectorRef
  ) {
    this.source = this._navParams.get('source');
    console.log(this.source);
  }

  ionViewDidLoad() {
    this.getNumberOfArticlesToDisplay();
    this.getNewsInSource();
    this.displayNews();
    
  }

  public getNewsInSource() {
    this.newsInSource = this._newsProvider.getNewsBySource(this.source);
  }

  public getNumberOfArticlesToDisplay() {
    this.loadMoreArticlesNum = this._configurationProvider.getNumberOfNewsArticlesForLoad();
  }

  public displayNews() {
    this.newsForDisplay = this.newsInSource.slice(0, this.loadMoreArticlesNum);
    this._changeDetectRef.detectChanges();
    this._cacheProvider.removeNewsFromCache(this.newsForDisplay);
  }

  public loadMoreNews(infinitiveScroll) {
    this.currIndex += 1;
    let news, start, end;
    start = this.currIndex*this.loadMoreArticlesNum;
    end = start + this.loadMoreArticlesNum;
    if ( end > this.newsInSource.length) {
      news = this.newsInSource.slice(start);
    } else {
      news = this.newsInSource.slice(start,end);
    }
    news.forEach( article => this.newsForDisplay.push(article));
    infinitiveScroll.complete();
    this._cacheProvider.removeNewsFromCache(news);
  }

  public closeReplacementList() {
    this._changePageProvider.closeReplacementList();
  }

}
