import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import { NewsProvider } from '../../providers/news';
import { InitialConfigurationProvider} from '../../providers/initial-configuration';
import { PagesProvider } from '../../providers/pages';
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
  pages: any = [];

  _subscriptions: Subscription[] = []
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private _newsProvider: NewsProvider,
    public initial: InitialConfigurationProvider,
    private _pagesProvider: PagesProvider,
    private _changeDetectRef: ChangeDetectorRef,
    private _cacheProvider: CacheProvider
  ) {

  }

  ionViewWillEnter() {
    this.getTopHeadlines();
    this.sortAllNewsBySource();
    this.sendSourcesToLeftMenu();
    this.getNumberOfPages();
    this._changeDetectRef.detectChanges();
  }

  public getNumberOfPages() {
    let numOfNews = this.newsInCategory.length;
    this.pages = this._pagesProvider.getNumberOfPages(numOfNews);
  }

  public showPage(numOfPage) {
    this.setNewsForDisplay(this._pagesProvider.showNews(this.newsInCategory, numOfPage));
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
    this.setNewsForDisplay(this.newsInCategory.slice(1,15));
  }

  public setNewsForDisplay(news) {
    this.newsForDisplay = news;
    this._cacheProvider.removeNewsFromCache('test', news,'top-headlines');
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
