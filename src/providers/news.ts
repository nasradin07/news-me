import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';

import { InitialConfigurationProvider } from './initial-configuration';
import { NewsFilterProvider } from './news-filter'; 
import { LeftMenuProvider } from './left-menu';

@Injectable()
export class NewsProvider {
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
    return this._initialConfigurationProvider.allNews['top-headlines'];
  }

  public getNewsByCategoryName(categoryName) {
    return this._initialConfigurationProvider.allNews[categoryName];
  }

  public getArticleByCategoryNameAndIndex(categoryName, index) {
    const allNews = this._initialConfigurationProvider.allNews[categoryName];
    if (index < allNews.length && index > -1) {
      return allNews[index];
    } else {
      return false;
    }
  }

  public getArticleBySourceNameAndIndex(sourceName, index) {
    let newsInSource = this.newsBySource[sourceName];
    if (index < newsInSource.length && index > -1) {
      return newsInSource[index];
    } else {
      return false;
    }

  }

  public sortNewsBySource(news) {
    const source = {};
    this.newsBySource = this._newsFilterProvider.filterBySource(news, source);
  }

  public sortAllNewsBySource() {
    const allNews = this._initialConfigurationProvider.getAllNews();
    this.newsBySource = this._newsFilterProvider.filterAllNewsBySources(allNews);
  } 

  public sendSourcesToLeftMenu() {
    const sources = Object.keys(this.newsBySource);
    this._leftMenuProvider.sendSourcesToLeftMenu(sources);
  }

  public getNewsBySource(sourceName) {
    return this.newsBySource[sourceName];
  }


}
