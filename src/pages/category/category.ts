import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { NewsProvider } from '../../providers/news';
import { NewsFilterProvider } from '../../providers/news-filter';
import { LeftMenuProvider } from '../../providers/left-menu';
import { PagesProvider } from '../../providers/pages';

@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {
  category: string;
  newsInCategory: any;
  newsForDisplay: any;
  newsBySource: any;
  sources: any;
  pages: any = [];
  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private _newsProvider: NewsProvider, private _newsFilterProvider: NewsFilterProvider,
    private _leftMenuProvider: LeftMenuProvider, private _pagesProvider: PagesProvider
  ) {
    this.category = this.navParams.get('name');
  }

  ionViewWillLoad() {
    const categoryName  = this.mutateCategoryNameForComparison(this.category);
    this.newsInCategory = this.getCategoryNews(categoryName);
    this.newsForDisplay = this.newsInCategory.slice(1,15);
    this.sortNewsBySource(this.newsInCategory);
    this.sendNewsSourcesToLeftMenu();
    this.getNumberOfPages();
  }

  public getNumberOfPages() {
    let numberOfNews = this.newsInCategory.length;
    this.pages = this._pagesProvider.getNumberOfPages(numberOfNews);
  }

  public showPage(numOfPage) {
    this.newsForDisplay = this._pagesProvider.showNews(this.newsInCategory, numOfPage);
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
