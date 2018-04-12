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
  private _url: string = 'http://api-news-me.ml/public/today-news?client=mobile';
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
    // this._cacheProvider.clearCache();
    this._cacheProvider.cacheRequest(this._url, request).subscribe(
      initialConfiguration => this.handleResponse(initialConfiguration),
      err => this.handleError(err)
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

  public handleResponse(initialConfiguration) {
    console.log(initialConfiguration);
    const allNews = initialConfiguration["newsCategories"];
    this.getNewsIdInLocalStorage().then(viewedNewsId => {
      if (viewedNewsId === null) {
        this.filterUserSeenNews(allNews, viewedNewsId);
      }
    }).then(() => {
      this.sendNotification(true);
    });
    this.clientConfiguration = initialConfiguration['clientConfiguration'];
  }

  public handleError(err) {
    let key = 'http://api-news-me.ml/public/today-news?client=mobile';
    this._cacheProvider.getInitialConfigurationFromCache(key)
      .then( InitialConfiguration  => this.handleResponse(InitialConfiguration) )
      .catch(err => {
        let key = 'http://api-news-me.ml/public/today-news?client=mobile';
        this.http.get(key).subscribe(
          initialConfiguration => this.handleResponse(initialConfiguration)
        );
      });
  }

  public getUrl() {
    return this._url;
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
