import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { NewsProvider } from '../../providers/news';
import { CacheProvider } from '../../providers/cache';
import { ConfigurationProvider } from '../../providers/configuration';
import { ChangePageProvider } from '../../providers/change-page';

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
  loadMoreArticlesNum:  number;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _newsProvider: NewsProvider, 
    private _cacheProvider: CacheProvider,
    private _configurationProvider: ConfigurationProvider,
    private _changePageProvider: ChangePageProvider,
    private _changeDetectRef: ChangeDetectorRef
  ) {
    this.category = this.navParams.get('name');
  }

  ionViewWillLoad() {
    this.getNumberOfArticlesToDisplay();
    this.getCategoryNews();
    this.displayNews();
    this.sortNewsBySource(this.newsInCategory);
    this.sendNewsSourcesToLeftMenu();
  }

  public getNumberOfArticlesToDisplay() {
    this.loadMoreArticlesNum = this._configurationProvider.getNumberOfNewsArticlesForLoad();
  }

  public mutateCategoryName(categoryName) {
    return categoryName.replace(/\s/g, '-').toLowerCase();
  }

  public getCategoryNews() {
    const categoryName  = this.mutateCategoryName(this.category);
    this.newsInCategory = this._newsProvider.getNewsByCategoryName(categoryName);
  }
  
  public displayNews() {
    this.newsForDisplay = this.newsInCategory.slice(0,this.loadMoreArticlesNum);
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
    start = this.currIndex*this.loadMoreArticlesNum;
    end = start + this.loadMoreArticlesNum;
    if ( end > this.newsInCategory.length) {
      news = this.newsInCategory.slice(start);
    } else {
      news = this.newsInCategory.slice(start,end);
    }
    news.forEach( article => this.newsForDisplay.push(article));
    infinitiveScroll.complete();
    const categoryName = this.mutateCategoryName(this.category);
    this._cacheProvider.removeNewsFromCache(news,categoryName);
  }

  public closeReplacementList() {
    this._changePageProvider.closeReplacementList();
  }

  public openMenu(event) {
    this._changePageProvider.openMenu(event);
  }

}
