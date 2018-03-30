import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { NewsProvider } from '../../providers/news/news';

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

  topNews: any;
  newsForDisplay: any;
  _subscriptions: Subscription[] = []
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private _newsProvider: NewsProvider
  ) {

  }

  ionViewWillEnter() {
    this.getTopHeadlines();
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
    this.topNews = this._newsProvider.getTopHeadlines();
    this.newsForDisplay = this.topNews.slice(1,15);
  }

  ionViewWillLeave() {
    this._subscriptions.forEach( subscription => subscription.unsubscribe());
  }

}
