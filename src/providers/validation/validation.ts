import { Injectable } from '@angular/core';

@Injectable()
export class ValidationProvider {

  constructor() {
    console.log('Hello ValidationProvider Provider');
  }

  public validateEmail(email) {
    const regex = /^[\w%-/\.]+@[\w\.]+[\w]$/;
    return regex.test(email);
  }

  public validatePassword(password) {
    const regex = /^[\w-]{6,}$/;
    return regex.test(password);
  }

  public validateUsername(username) {
    const regex = /^[\w]{4,}$/;
    return regex.test(username);
  }

  public isUserRegistrationInputValid(username, email, password) {
    return this.validateUsername(username) && this.validateEmail(email) && this.validatePassword(password);
  }

  public isUserLoginInputValid(email, password) {
    return this.validateEmail(email) && this.validatePassword(password);
  }

}
