import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { CategoryPage } from '../category/category';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  categories: Array<{name: string, iconName: string}> = [
    { name: 'General', iconName: 'albums'},
    { name: 'Business', iconName: 'briefcase'},
    { name: 'Technology', iconName: 'laptop' },
    { name: 'Sport', iconName: 'football'},
    { name: 'Entertainment', iconName: 'easel'}
  ];
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController
  ) {

  }

  public openSignInModal() {
    this.navCtrl.push(LoginPage);
  }

  public openPage(pageName) {
    this.navCtrl.push(CategoryPage, {
      name: pageName
    });
  }

}
