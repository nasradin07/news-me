import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import { NewsProvider } from '../../providers/news';
import { CacheProvider } from '../../providers/cache';
import { RefreshProvider } from '../../providers/refresh';
import { ConfigurationProvider } from '../../providers/configuration';
import { ChangePageProvider } from '../../providers/change-page';

import { LoginPage } from '../login/login';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  name: string = 'Top Headlines';
  categories: Array<{name: string, iconName: string}>;
  newsInCategory: any;
  newsForDisplay: any;
  currIndex: number = 0;
  _subscriptions: Subscription[] = [];
  loadMoreArticlesNum: number;
  category;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _newsProvider: NewsProvider,
    private _changeDetectRef: ChangeDetectorRef,
    private _cacheProvider: CacheProvider,
    private _refreshProvider: RefreshProvider,
    private _configurationProvider: ConfigurationProvider,
    private _changePageProvider: ChangePageProvider
  ) { 
    this.category = this.navParams.get('name');
  }

  ionViewWillEnter() {
    this.getNumberOfArticlesToDisplay();
    this.getCategoryNews();
    this.sortAllNewsBySource();
    this.sendSourcesToLeftMenu();
    this._changeDetectRef.detectChanges();
  }

  public saveNewsConfiguration(categories) {
    this._configurationProvider.saveClientNewsConfiguration(categories);
  }

  public getNumberOfArticlesToDisplay() {
    this.loadMoreArticlesNum = this._configurationProvider.getNumberOfNewsArticlesForLoad();
  }

  public refreshApp(event) {
    this._refreshProvider.refreshApp()
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
    this._changeDetectRef.detectChanges();
    this.removeNewsFromCache(news);
  }

  public openSignInModal() {
    this.navCtrl.push(LoginPage);
  }

  public getCategoryNews() {
    this.newsInCategory = this._newsProvider.getNewsByCategoryName(this.category);
    this.setNewsForDisplay(this.newsInCategory.slice(0,this.loadMoreArticlesNum));
  }

  public setNewsForDisplay(news) {
    this.newsForDisplay = news;
    this.removeNewsFromCache(news);
  }

  public removeNewsFromCache(news) {
    this._cacheProvider.removeNewsFromCache(news,'top-headlines');
  }

  public sortAllNewsBySource() {
    this._newsProvider.sortAllNewsBySource();
  }

  public sendSourcesToLeftMenu() {
    this._newsProvider.sendSourcesToLeftMenu();
  }

  public closeReplacementList() {
    this._changePageProvider.closeReplacementList();
  }

  public openMenu(event) {
    this._changePageProvider.openMenu(event);
  }

  ionViewWillLeave() {
    this._subscriptions.forEach( subscription => subscription.unsubscribe());
  }

  

}
