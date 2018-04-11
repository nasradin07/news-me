import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class StorageProvider {

  constructor(private _storage: Storage) {
  }
  public addToVisitedNews(newsId) {
    this._storage.get('visitedNews')
      .then(seenNews => {
        if (seenNews === null) {
          this.initializeVisitedNewsArrayInLocalStorage()
            .then( () => {
              this.addToVisitedNews(newsId);
            })
            .catch(err => console.log(err));
        } else {
          seenNews.push(newsId);
          this._storage.set('visitedNews',seenNews);
        }
      })
      .catch(err => console.log(err));
    }

    public addToLikedNews(newsId) {
      this._storage.get('likedNews')
        .then(likedNews => {
          console.log(likedNews);
          if (likedNews === null) {
            this.initializeLikedNewsArrayInLocalStorage()
              .then(() => this.addToLikedNews(newsId))
          } else {
            likedNews.push(newsId);
            this._storage.set('likedNews', likedNews);
          }
        })
    }

  public initializeVisitedNewsArrayInLocalStorage() {
    return this._storage.set('visitedNews', []);
  }

  public initializeLikedNewsArrayInLocalStorage() {
    return this._storage.set('likedNews', []);
  }

  public getVisitedNews() {
    return this._storage.get('visitedNews');
  }


}