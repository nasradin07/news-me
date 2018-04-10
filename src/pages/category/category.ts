import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { NewsProvider } from '../../providers/news';
import { NewsFilterProvider } from '../../providers/news-filter';
import { LeftMenuProvider } from '../../providers/left-menu';
import { CacheProvider } from '../../providers/cache';

@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {
  category: string;
  newsInCategory: any;
  newsForDisplay: any;
  newsBySource: any;
  sources: any;
  currIndex: number = 0;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _newsProvider: NewsProvider, 
    private _newsFilterProvider: NewsFilterProvider,
    private _leftMenuProvider: LeftMenuProvider, 
    private _cacheProvider: CacheProvider,
    private _changeDetectRef: ChangeDetectorRef
  ) {
    this.category = this.navParams.get('name');
  }

  ionViewWillLoad() {
    this.getCategoryNews();
    this.displayNews();
    this.sortNewsBySource(this.newsInCategory);
    this.sendNewsSourcesToLeftMenu();
  }

  public mutateCategoryNameForComparison(categoryName) {
    return categoryName.replace(' ', '-').toLowerCase();
  }

  public getCategoryNews() {
    const categoryName  = this.mutateCategoryNameForComparison(this.category);
    this.newsInCategory = this._newsProvider.getNewsByCategoryName(categoryName);
  }
  
  public displayNews() {
    this.newsForDisplay = this.newsInCategory.slice(0,15);
    this._changeDetectRef.detectChanges();
    this._cacheProvider.removeNewsFromCache(this.newsForDisplay);
  }

  public sortNewsBySource(news) {
    this._newsProvider.sortNewsBySource(news);
  }

  public sendNewsSourcesToLeftMenu() {
    this._newsProvider.sendSourcesToLeftMenu();
  }

  public loadMoreNews(infinitiveScroll) {
    this.currIndex += 1;
    let news, start, end;
    start = this.currIndex*15;
    end = start + 15;
    if ( end > this.newsInCategory.length) {
      news = this.newsInCategory.slice(start);
    } else {
      news = this.newsInCategory.slice(start,end);
    }
    news.forEach( article => this.newsForDisplay.push(article));
    infinitiveScroll.complete();
    const categoryName = this.mutateCategoryNameForComparison(this.category);
    this._cacheProvider.removeNewsFromCache(news,categoryName);
  }

}
