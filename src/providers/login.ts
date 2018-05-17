import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { UserProvider } from './user';
import { StorageProvider } from './storage';

@Injectable()
export class LoginProvider {
  private _url: string = 'http://api-news-me.ml/public/users/login';
  private _messageSubject = new Subject();
  public sendMessage$ = this._messageSubject.asObservable();
  constructor(
    private _http: HttpClient,
    private _userProvider: UserProvider,
    private _storageProvider: StorageProvider
  ) {
  }

  public login(email, password) {
    this._http.post(this._url, {
        email: email,
        password: password
      })
      .subscribe(
        response => this.handleResponse(response),
        error => this.handleError(error)
      );
  }

  public handleError(errorObj) {
    const error = {
      status: 'filed',
      message: errorObj.message
    };
    this._sendErrorMessage(error);
  }
  
  public handleResponse(response) {
    console.log(response);
    this._userProvider.takeUserData(response);
    const success = {
      status: 'success',
      message: 'You have successfully signed in'
    };
    this._storageProvider.getLikedNews()
      .then(likedNews => this.handleLikedNews(likedNews))
      .catch(err => console.log(err));
    this._sendSuccessMessage(success);
  }

  public logOut() {
    
  }

  public handleLikedNews(likedNews) {
    if (likedNews === null) {
      return;
    } else {
      likedNews.forEach( likedNewsId => this._userProvider.addArticleToVisitedNews(likedNewsId));
    }
  }

  public loginUserAutomaticly() {
    this._storageProvider.getUserEmailAndPassword()
      .then(data => {
        if (data === null) {
          return;
        }
        this.login(data.email, data.password);
      })
      .catch(err => console.log(err));
  }

  private _sendErrorMessage(error) {
    this._messageSubject.next(error);
  }

  private _sendSuccessMessage(success) {
    this._messageSubject.next(success);
  }

}
