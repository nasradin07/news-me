import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { NewsProvider } from '../../providers/news/news';
@Component({
  selector: 'page-source-news',
  templateUrl: 'source-news.html',
})
export class SourceNewsPage {
  news: any;
  source: string;
  constructor(
    private _navParams: NavParams,
    private _newsProvider: NewsProvider
  ) {
    this.source = this._navParams.get('source');
  }

  ionViewDidLoad() {
    this.news = this._newsProvider.getNewsBySource(this.source);
    console.log(this.news.length);
  }

}
