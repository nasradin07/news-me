import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class HistoryProvider {
  public seenNews: any = [];
  constructor(public http: HttpClient) {
    
  }

  public addNewsToVisitedNews(news) {
    this.seenNews.push(news);
  }

}
