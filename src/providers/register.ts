import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { UserProvider } from './user';

@Injectable()
export class RegisterProvider {
  url: string = 'http://api-news-me.ml/public/register';
  private _messageSubject = new Subject();
  public sendMessage$ = this._messageSubject.asObservable();


  constructor(
    private _http: HttpClient,
    private _userProvider: UserProvider
  ) {
  }

  public register(username, email, password, birthYear) {
    const registrationObj = {
    "username": username,
    "password": password,
    "email": email,
    "birthyear": birthYear
  };
   this._http.post(this.url, registrationObj).subscribe(
    response => this.handleResponse(response),
    errorResponse => this.handleError(errorResponse)
  );
}

  public handleResponse(userData) {
    this._userProvider.takeUserData(userData);
    const message = {
      status: 'success',
      message: 'You have successfully registered'
    };
    this.sendSuccessMsg(message);
  }

  public handleError(errorResponse) {
    const error = {
      status: 'failed',
      message: errorResponse.message
    }

    this.sendError(error);
  }

  public sendError(error) {
    this._messageSubject.next(error);
  }

  public sendSuccessMsg(msg) {
    this._messageSubject.next(msg);
  }
}
