import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { LeftMenuProvider } from '../../providers/left-menu';
import { LikeProvider } from '../../providers/like';

@Component({
  selector: 'page-single-article',
  templateUrl: 'single-article.html',
})
export class SingleArticlePage {
  article: any;
  date: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _leftMenuProvider: LeftMenuProvider,
    private _likeProvider: LikeProvider
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

  public like(newsId) {
    this._likeProvider.like(newsId);
  }

  public dislike() {
    console.log('dislike');
  }

}
