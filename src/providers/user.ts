import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserProvider {
    private _user;
    private _actionUrl = 'http://api-news-me.ml/public/news-action';
    constructor(
        private _http: HttpClient
    ) {}

    public takeUserData(userData) {
        this._user = userData;
        console.log(userData);
    }

    public addArticleToVisitedNews(newsId) {
        let action = {
            "action": "addNewsToVisited",
            "userEmail": this._user['email'],
            "newsId":newsId
        };
        this._http.post(this._actionUrl, action)
            .subscribe(response => console.log(response), err => console.log(err));
    }

    public isUserLoggedIn() {
        if (this._user === undefined) {
            return false;
        } else if (this._user !== undefined) {
            return true;
        }
    }
}