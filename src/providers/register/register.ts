import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class RegisterProvider {
  url: string = 'http://api-news-me.ml/public/register';
  private _messageSubject = new Subject();
  public sendMessage$ = this._messageSubject.asObservable();
  constructor(private _http: HttpClient) {
  }

  public register(username, email, password) {
   this._http.post(this.url,{
     username: username, 
     email: email, 
     password: password
  }).subscribe(
    response => this.handleResponse(response),
    errorResponse => this.handleError(errorResponse)
  );
}

  public handleResponse(response) {

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

  public sendSuccess(success) {
    this._messageSubject.next(success);
  }
}
