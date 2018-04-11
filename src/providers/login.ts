import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { UserProvider } from './user';

@Injectable()
export class LoginProvider {
  private _url: string = 'http://api-news-me.ml/public/login';
  private _user;
  private _messageSubject = new Subject();
  public sendMessage$ = this._messageSubject.asObservable();
  constructor(
    private _http: HttpClient,
    private _userProvider: UserProvider
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
    this._userProvider.takeUserData(response);
    const success = {
      status: 'success',
      message: 'You have successfully signed in'
    };
    this._sendSuccessMessage(success);
  }

  private _sendErrorMessage(error) {
    this._messageSubject.next(error);
  }

  private _sendSuccessMessage(success) {
    this._messageSubject.next(success);
  }

}