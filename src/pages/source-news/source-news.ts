import { Component, ChangeDetectorRef } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { NewsProvider } from '../../providers/news';
import { CacheProvider } from '../../providers/cache';
@Component({
  selector: 'page-source-news',
  templateUrl: 'source-news.html',
})
export class SourceNewsPage {
  newsInSource: any;
  source: string;
  newsForDisplay;
  currIndex = 0;
  constructor(
    private _navParams: NavParams,
    private _newsProvider: NewsProvider,
    private _cacheProvider: CacheProvider,
    private _changeDetectRef: ChangeDetectorRef
  ) {
    this.source = this._navParams.get('source');
  }

  ionViewDidLoad() {
    this.getNewsInSource();
    this.displayNews();
  }

  public getNewsInSource() {
    this.newsInSource = this._newsProvider.getNewsBySource(this.source);
  }

  public displayNews() {
    this.newsForDisplay = this.newsInSource.slice(0, 15);
    this._changeDetectRef.detectChanges();
    this._cacheProvider.removeNewsFromCache(this.newsForDisplay);
  }

  public loadMoreNews(infinitiveScroll) {
    this.currIndex += 1;
    let news, start, end;
    start = this.currIndex*15;
    end = start + 15;
    if ( end > this.newsInSource.length) {
      news = this.newsInSource.slice(start);
    } else {
      news = this.newsInSource.slice(start,end);
    }
    news.forEach( article => this.newsForDisplay.push(article));
    infinitiveScroll.complete();
    this._cacheProvider.removeNewsFromCache(news);
  }

}
