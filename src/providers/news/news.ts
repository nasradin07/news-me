import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';

import { InitialConfigurationProvider } from '../initial-configuration/initial-configuration';
import { NewsFilterProvider } from '../news-filter/news-filter'; 
import { LeftMenuProvider } from '../left-menu/left-menu';;

@Injectable()
export class NewsProvider {
  public newsInCurrentCategory: any;
  public newsBySource: any;

  private _sendSourcesToLeftMenu = new Subject();
  public sourcesFetchEvent$ = this._sendSourcesToLeftMenu.asObservable();
  constructor(
    private _newsFilterProvider: NewsFilterProvider,
    private _initialConfigurationProvider: InitialConfigurationProvider,
    private _leftMenuProvider: LeftMenuProvider
  ) {
   
  }

  public getTopHeadlines() {
    this.newsInCurrentCategory = this._initialConfigurationProvider.allNews.find(
      newsByCategory => newsByCategory.categoryName === 'top-headlines'
    );
    return this.newsInCurrentCategory.news;
  }

  public getNewsByCategoryName(categoryName) {
    const categoryNews =  this._initialConfigurationProvider.allNews.find(
      newsByCategory =>  newsByCategory.categoryName === categoryName
    );
    return categoryNews.news;
  }

  public sortNewsBySource(news) {
    this.newsBySource = this._newsFilterProvider.filterBySource(news);
  }

  public sendSourcesToLeftMenu() {
    const sources = Object.keys(this.newsBySource);
    this._leftMenuProvider.sendSourcesToLeftMenu(sources);
  }

  public getNewsBySource(sourceName) {
    return this.newsBySource[sourceName];
  }


}
