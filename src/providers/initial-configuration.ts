import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { NewsFilterProvider } from '../providers/news-filter';
import { UserProvider } from '../providers/user';
import { StorageProvider } from '../providers/storage';
import { HistoryProvider } from '../providers/history';
import { CacheProvider } from '../providers/cache';

@Injectable()
export class InitialConfigurationProvider {
  private _url: string = 'http://api-news-me.ml/public/today-news';
  allNews: any = [];
  clientConfiguration: any;

  private _sendNotification = new Subject();
  public initialConfigurationFetchEvent$ = this._sendNotification.asObservable();

  constructor(
    public http: HttpClient,
    private _userProvider: UserProvider,
    private _storageProvider: StorageProvider,
    private _historyProvider: HistoryProvider,
    private _cacheProvider: CacheProvider
  ) { }

  getInitialConfiguration() {
    let request = this.http.get(this._url);
    let cacheKey = this._url;
    this._cacheProvider.cacheRequest(this._url, request).subscribe(
      initialConfiguration => {
      const allNews = initialConfiguration["newsCategories"];
      this.getNewsIdInLocalStorage().then(viewedNewsId => {
        this.filterUserSeenNews(allNews, viewedNewsId);
      }).then(() => {
        this._cacheProvider.saveNewsToCache('test', this.allNews);
        this.sendNotification(true);
      });
      this.clientConfiguration = initialConfiguration['clientConfiguration'];
      },
    err => console.log(err)
  );
  }

  filterUserSeenNews(allNews, viewedNewsId) {
    allNews.forEach(newsByCategory => {
      const newsWithoutSeenNews = {
        categoryName: newsByCategory.categoryName,
        news: []
      };
      newsByCategory.news.forEach(news => {
        const isNewsSeen = this.checkIfNewsWasSeen(viewedNewsId, news._id);
        if (isNewsSeen === true) {
          this._historyProvider.addNewsToVisitedNews(news);
          return;
        } else {
          newsWithoutSeenNews.news.push(news);
        }
      });
     this.allNews.push(newsWithoutSeenNews);
    });
  }


  public getAllNews() {
    return this.allNews;
  }

  public sendNotification(param) {
    this._sendNotification.next(param);
  }

  public checkIfNewsWasSeen(viewedNewsId, newsId) {
    const isNewsIdInStorage = this.isNewsIdInStorage(viewedNewsId, newsId);
    const isNewsIdInUserVisitedNews = this.checkIfNewsIdIsInUserVisitedNews(newsId);
    return isNewsIdInStorage || isNewsIdInUserVisitedNews;
  }

  public getNewsIdInLocalStorage() {
    const visitedNewsPromise = this.getVisitedNewsFromStorage();
    return visitedNewsPromise;
  }

  public getVisitedNewsFromStorage() {
    return this._storageProvider.getVisitedNews();
  }

  public isNewsIdInStorage(visitedNews = [], newsId) {
    if( visitedNews === null) {
      return;
    }
    return  !!(visitedNews.find(newsIdInStorage => {
      return newsIdInStorage === newsId;
    }));
  }

  public checkIfNewsIdIsInUserVisitedNews(newsId) {
    const userVisitedNews = this._userProvider.getUserVisitedNews();
    if (userVisitedNews === null) {
      return false;
    } else {
      return userVisitedNews.find(visitedNewsId => visitedNewsId === newsId)
    }
  }

}
