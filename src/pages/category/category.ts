import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {
  category: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.category = this.navParams.get('name');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
  }

}
