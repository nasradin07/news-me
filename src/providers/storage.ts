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
            }).catch(err => console.log(err));
        } else {
          this._storage.set('visitedNews',seenNews);
        }
      })
      .catch(err => console.log(err));
    }

  public initializeVisitedNewsArrayInLocalStorage() {
    return this._storage.set('visitedNews', [])
  }


}
