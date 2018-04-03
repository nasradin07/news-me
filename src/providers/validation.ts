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

  public validateYearOfBirth(year) {
    const regex = /\d\d\d\d/;
    const firstDigit = parseInt(year[0], 10);
    const isFirstDigitValid = firstDigit <= 2 && firstDigit != 0;
    return regex.test(year) && isFirstDigitValid;
  }

  public isUserRegistrationInputValid(username, email, password, year) {
    return this.validateUsername(username) && 
      this.validateEmail(email) && 
      this.validatePassword(password) &&
      this.validateYearOfBirth(year);
  }

  public isUserLoginInputValid(email, password) {
    return this.validateEmail(email) && this.validatePassword(password);
  }

}
