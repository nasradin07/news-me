import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { LeftMenuProvider } from '../../providers/left-menu';

@Component({
  selector: 'page-single-article',
  templateUrl: 'single-article.html',
})
export class SingleArticlePage {
  article: any;
  date: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _leftMenuProvider: LeftMenuProvider
  ) {
    this.article = this.navParams.get('article');
  }

  ionViewDidLoad() {
    this.date = (new Date(this.article.publishedAt)).toDateString();
    const source = this.article.source;
    this.notifyLeftMenuToShowNewsForSource(source);
  }

  public notifyLeftMenuToShowNewsForSource(source) {
    this._leftMenuProvider.notifyLeftMenuToShowNewsForSource(source);
  }

  public goToSource() {
    window.location.href = this.article.url;
  }

  public like() {
    console.log('like');
  }

  public dislike() {
    console.log('dislike');
  }

}
