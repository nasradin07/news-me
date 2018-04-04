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
            /*allNews.forEach(  newsByCategory => {
              const newsSortedByCategory = {
                categoryName: newsByCategory.categoryName,
                news: []
              };
              newsByCategory.news.forEach(  news => {
                this.checkIfNewsIsAlreadySeen(news._id).then(
                  isNewsAlreadySeen => {
                    if (isNewsAlreadySeen[0] === true || isNewsAlreadySeen[1]){
                      this.pushSeenNewsToNewsHistory(news);
                      return;
                    }
                    newsSortedByCategory.news.push(news);
                    this.allNews.push(newsSortedByCategory);
                  }
                );
              });        
            });*/
          this.filterSeenNews(allNews).then(val => {
            console.log('resolved');
            this.sendNotification(val);
            
          });
          this.clientConfiguration = initialConfiguration['clientConfiguration'];
          },
        err => console.log(err)
      );
  }

  public filterSeenNews(allNews) {
      allNews.forEach( newsByCategory => {
        const newsSortedByCategory = {
          categoryName: newsByCategory.categoryName,
          news: []
        };
        newsByCategory.news.forEach(  news => {
          this.checkIfNewsIsAlreadySeen(news._id).then(
            isNewsAlreadySeen => {
              if (isNewsAlreadySeen[0] === true || isNewsAlreadySeen[1]){
                this.pushSeenNewsToNewsHistory(news);
                return;
              }
              newsSortedByCategory.news.push(news);
              this.allNews.push(newsSortedByCategory);
            }
          );
        });     
      }); 
      return new Promise(resolve =>resolve(true));
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

  public checkIfNewsIsAlreadySeen(newsId) {
    return Promise.all([
      this.checkIfNewsIdIsInUserVisitedNews(newsId),
      this.getNewsIdInLocalStorage().
        then(visitedNewsIds => {
          const isNewsIdInStorage = this.isNewsIdInStorage(visitedNewsIds, newsId);
          return isNewsIdInStorage;
        })
    ]);
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
}
