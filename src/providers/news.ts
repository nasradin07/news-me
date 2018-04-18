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
    return this._initialConfigurationProvider.allNews['top-headlines'];
  }

  public getNewsByCategoryName(categoryName) {
    return this._initialConfigurationProvider.allNews[categoryName];
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
