import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { NewsProvider } from '../../providers/news/news';
import { NewsFilterProvider } from '../../providers/news-filter/news-filter';
import { LeftMenuProvider } from '../../providers/left-menu/left-menu';

@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {
  category: string;
  newsByCategory: any;
  showNews: any;
  newsBySource: any;
  sources: any;
  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private _newsProvider: NewsProvider, private _newsFilterProvider: NewsFilterProvider,
    private _leftMenuProvider: LeftMenuProvider
  ) {
    this.category = this.navParams.get('name');
  }

  ionViewWillLoad() {
    const categoryName  = this.mutateCategoryNameForComparison(this.category);
    this.newsByCategory = this.getCategoryNews(categoryName);
    this.showNews = this.newsByCategory.slice(1,15);
    this.sortNewsBySource(this.newsByCategory);
    this.sendNewsSourcesToLeftMenu();
  }

  public mutateCategoryNameForComparison(categoryName) {
    return categoryName.replace(' ', '-').toLowerCase();
  }

  public getCategoryNews(categoryName) {
    return this._newsProvider.getNewsByCategoryName(categoryName);
  }

  public sortNewsBySource(news) {
    this._newsProvider.sortNewsBySource(news);
  }

  public sendNewsSourcesToLeftMenu() {
    this._newsProvider.sendSourcesToLeftMenu();
  }

}
