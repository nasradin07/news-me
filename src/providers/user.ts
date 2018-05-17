import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class UserProvider {
    private _user = false;
    private _actionUrl = 'http://api-news-me.ml/public/news-action';
    constructor(
        private _http: HttpClient
    ) {}


    public takeUserData(userData) {
        this._user = userData;
    }

    public addArticleToVisitedNews(newsId) {
        let action = {
            "action": "addNewsToVisited",
            "userEmail": this.getUserEmail(),
            "newsId":newsId
        };
        this._http.post(this._actionUrl, action)
            .subscribe(response => console.log(response), err => console.log(err));
    }

    public isUserLoggedIn() {
        if (this._user === false) {
            return false;
        } else {
            return true;
        }
    }

    public getUserVisitedNews() {
        if (this.isUserLoggedIn() === false) {
            return null;
        } else {
            return this._user['visitedNews'];
        }
    }

    public getUserEmail() {
        return this._user['email'];
    }

    public removeUserData() {
        this._user = false;
    }
}