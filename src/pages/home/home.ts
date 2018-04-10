import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import { NewsProvider } from '../../providers/news';
import { CacheProvider } from '../../providers/cache';

import { LoginPage } from '../login/login';
import { CategoryPage } from '../category/category';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  categories: Array<{name: string, iconName: string}> = [
    { name: 'General News', iconName: 'albums'},
    { name: 'Business News', iconName: 'briefcase'},
    { name: 'Technology News', iconName: 'laptop' },
    { name: 'Sport News', iconName: 'football'},
    { name: 'Entertainment News', iconName: 'easel'}
  ];

  newsInCategory: any;
  newsForDisplay: any;
  currIndex: number = 0;
  _subscriptions: Subscription[] = []
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private _newsProvider: NewsProvider,
    private _changeDetectRef: ChangeDetectorRef,
    private _cacheProvider: CacheProvider
  ) { }

  ionViewWillEnter() {
    this.getTopHeadlines();
    this.sortAllNewsBySource();
    this.sendSourcesToLeftMenu();
    this._changeDetectRef.detectChanges();
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
    this._changeDetectRef.detectChanges();
    this.removeNewsFromCache(news);
  }


  public openSignInModal() {
    this.navCtrl.push(LoginPage);
  }

  public openPage(pageName) {
    this.navCtrl.push(CategoryPage, {
      name: pageName
    });
  }

  public getTopHeadlines() {
    this.newsInCategory = this._newsProvider.getTopHeadlines();
    this.setNewsForDisplay(this.newsInCategory.slice(0,15));
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
