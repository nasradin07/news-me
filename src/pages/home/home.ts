import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import { NewsProvider } from '../../providers/news';
import { CacheProvider } from '../../providers/cache';
import { RefreshProvider } from '../../providers/refresh';
import { ChangePageProvider } from '../../providers/change-page';
import { ConfigurationProvider } from '../../providers/configuration';

import { LoginPage } from '../login/login';
import { CategoryPage } from '../category/category';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  allCategories: Array<{name: string, iconName: string}> = [
    { name: 'General News', iconName: 'albums'},
    { name: 'Business News', iconName: 'briefcase'},
    { name: 'Programming News', iconName: 'laptop' },
    { name: 'Sport News', iconName: 'football'},
    { name: 'Entertainment News', iconName: 'easel'},
    { name: 'Cryptocurrency News', iconName: 'cash'},
    { name: 'Lyfestyle News', iconName: 'heart' },
    { name: 'Technology News', iconName: 'phone-portrait' }
  ];
  categories: Array<{name: string, iconName: string}>;
  mousepressedd: boolean = false;
  newsInCategory: any;
  newsForDisplay: any;
  currIndex: number = 0;
  _subscriptions: Subscription[] = [];
  loadMoreArticlesNum: number;
  mousepressed;
  categoryPickerOpened: boolean;
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private _newsProvider: NewsProvider,
    private _changeDetectRef: ChangeDetectorRef,
    private _cacheProvider: CacheProvider,
    private _refreshProvider: RefreshProvider,
    private _configurationProvider: ConfigurationProvider,
    private _alertCtrl: AlertController
  ) { }

  ionViewWillEnter() {
    this.getNumberOfArticlesToDisplay();
    this.getTopHeadlines();
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

  public getTopHeadlines() {
    this.newsInCategory = this._newsProvider.getTopHeadlines();
    this.setNewsForDisplay(this.newsInCategory.slice(0,5));
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

  ionViewWillLeave() {
    this._subscriptions.forEach( subscription => subscription.unsubscribe());
  }

  

}
