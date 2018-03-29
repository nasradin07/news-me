import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

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
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private _newsProvider: NewsProvider
  ) {

  }

  ionViewWillEnter() {
    this.getInitialNews();
  }

  public openSignInModal() {
    this.navCtrl.push(LoginPage);
  }

  public openPage(pageName) {
    this.navCtrl.push(CategoryPage, {
      name: pageName
    });
  }

  public getInitialNews() {
    this._newsProvider.getInitialNews();
  }

}
