import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class RegisterProvider {

  constructor(public http: HttpClient) {
  }

  public register(username, email, password) {
    console.log(username, email, password);
  }
}
