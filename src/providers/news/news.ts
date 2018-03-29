import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { NewsFilterProvider } from '../news-filter/news-filter'; 

@Injectable()
export class NewsProvider {
  private _url: string = 'http://api-news-me.ml/public/today-news';
  public newsByCategory: any;
  public newsBySource: any;

  constructor(
    private _http: HttpClient,
    private _newsFilterProvider: NewsFilterProvider
  ) {
   
  }

  public getInitialNews() {
    this._http.get(this._url)
      .subscribe(
        initialConfiguration => {
          this.newsByCategory = initialConfiguration['newsCategories'];
          console.log(this.newsByCategory);
        }
      )
  }

  public getNewsBySource(news) {
    this.newsBySource = this._newsFilterProvider.filterBySource(news);
  }



}
