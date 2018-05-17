import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';

import { StorageProvider } from './storage';
import { UserProvider } from './user'

@Injectable()
export class LikeProvider {
    private _url = 'http://api-news-me.ml/public/users/news-action';
    constructor(
        private _http: HttpClient,
        private _storageProvider: StorageProvider,
        private _userProvider: UserProvider
    ) {}

    public like(newsId) {
        if (this._userProvider.isUserLoggedIn() === true && this.checkIfDeviceIsOnline() === true) {
            this.addLikedNewsIdToUserLikedNews(newsId)
        } else {
            this.addLikedNewsIdToStorage(newsId);
        }
    }

    public addLikedNewsIdToStorage(newsId) {
        this._storageProvider.addToLikedNews(newsId);
    }

    public addLikedNewsIdToUserLikedNews(newsId) {
        let action = {
            "action": "likeNews",
            "userEmail": this._userProvider.getUserEmail(),
            "newsId": newsId
        };
        this._http.post(this._url, action)
            .subscribe( response => console.log(response), err => console.log(err));
    }

    public checkIfDeviceIsOnline() {
        return window.navigator.onLine === true;
    }
}