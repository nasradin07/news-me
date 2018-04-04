import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';

import { InitialConfigurationProvider } from './initial-configuration';
import { NewsFilterProvider } from './news-filter'; 
import { LeftMenuProvider } from './left-menu';

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
    //console.log('After searching too headlines', '\n', this._initialConfigurationProvider.allNews);
    return this.newsInCurrentCategory.news;
  }

  public getNewsByCategoryName(categoryName) {
    const categoryNews =  this._initialConfigurationProvider.allNews.find(
      newsByCategory =>  newsByCategory.categoryName === categoryName
    );
    return categoryNews.news;
  }

  public sortNewsBySource(news) {
    const source = {};
    this.newsBySource = this._newsFilterProvider.filterBySource(news, source);
  }

  public sortAllNewsBySource() {
    const allNews = this._initialConfigurationProvider.getAllNews();
    //console.log('Before sorting all','\n',JSON.stringify(this._initialConfigurationProvider.allNews));
    this.newsBySource = this._newsFilterProvider.filterAllNewsBySources(allNews);
    //console.log('After sorting all','\n',JSON.stringify(this._initialConfigurationProvider.allNews));
  } 

  public sendSourcesToLeftMenu() {
    const sources = Object.keys(this.newsBySource);
    this._leftMenuProvider.sendSourcesToLeftMenu(sources);
  }

  public getNewsBySource(sourceName) {
    return this.newsBySource[sourceName];
  }


}
