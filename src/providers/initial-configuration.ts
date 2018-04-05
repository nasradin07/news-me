import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { NewsFilterProvider } from '../providers/news-filter';
import { UserProvider } from '../providers/user';
import { StorageProvider } from '../providers/storage';
import { HistoryProvider } from '../providers/history';

@Injectable()
export class InitialConfigurationProvider {
  private _url: string = 'http://api-news-me.ml/public/today-news';
  allNews: any = [];
  clientConfiguration: any;

  private _sendNotification = new Subject();
  public initialConfigurationFetchEvent$ = this._sendNotification.asObservable();

  constructor(
    public http: HttpClient,
    private _newsFilterProvider: NewsFilterProvider,
    private _userProvider: UserProvider,
    private _storageProvider: StorageProvider,
    private _historyProvider: HistoryProvider
  ) {

  }
  getInitialConfiguration() {
    this.http.get(this._url)
      .subscribe(
          initialConfiguration => {
          const allNews = initialConfiguration["newsCategories"];
          const viewedNewsIdPromise = this.getNewsIdInLocalStorage(); 
          viewedNewsIdPromise.then(viewedNewsId => {
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
          }).then(() => {this.sendNotification(true);console.log(this.allNews)});
          this.clientConfiguration = initialConfiguration['clientConfiguration'];
          },
        err => console.log(err)
      );
  }

  public filterNewsByCategory(viewedNewsId, newsByCategory) {
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
    return newsWithoutSeenNews;
  }

  public filterNews(newsInCategory) {
    /*newsInCategory.forEach(news => {
      const isNewsSeen = this.checkIfNewsWasSeen(viewedNewsId, news._id);
      if (isNewsSeen === true) {
        this._historyProvider.addNewsToVisitedNews(news);
        return true;
      } else {
        newsWithoutSeenNews.news.push(news);
      }
    });*/
  }

  public pushSeenNewsToNewsHistory(news) {
    this._historyProvider.seenNews.push(news);
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
    return isNewsIdInStorage && isNewsIdInUserVisitedNews;
  }

  public getNewsIdInLocalStorage() {
    const visitedNewsPromise = this.getVisitedNewsFromStorage();
    return visitedNewsPromise;
  }

  public getVisitedNewsFromStorage() {
    return this._storageProvider.getVisitedNews();
  }

  public isNewsIdInStorage(visitedNews, newsId) {
    if (visitedNews === null) {
      return;
    }
    const newsIdInStorage = visitedNews.find(newsIdInStorage => {
      return newsIdInStorage === newsId;
    });

    if (newsIdInStorage === undefined) {
      return false;
    } else {
      return true;
    }
  }

  public checkIfNewsIdIsInUserVisitedNews(newsId) {
    const userVisitedNews = this._userProvider.getUserVisitedNews();
    if (userVisitedNews === null) {
      return false;
    } else {
      return userVisitedNews.find(visitedNewsId => visitedNewsId === newsId)
    }
  }

  processN
}
