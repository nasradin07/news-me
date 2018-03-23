import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// PROVIDES
import { ValidationProvider } from '../../providers/validation/validation';
import { RegisterProvider } from '../../providers/register/register';

@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
  providers: [ValidationProvider ,RegisterProvider]
})
export class RegistrationPage {
  username: string = '';
  email: string = '';
  password: string = '';
  showUsernameError = false;
  showEmailError = false;
  showPasswordError = false;
  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private _validationProvider: ValidationProvider, private _registerProvider: RegisterProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationPage');
  }

  public register() {
    if ( !this.isUserRegistrationInputValid() ) {
      console.log('input not valid');
      return;
    }
    const username = this.username.trim();
    const email = this.email.trim();
    const password = this.password.trim();
    this._registerProvider.register(username, email, password);

  }

  public isUsernameValid() {
    this.showUsernameError = !this._validationProvider.validateUsername(this.username.trim());
  }

  public isEmailValid() {
    this.showEmailError =  !this._validationProvider.validateEmail(this.email.trim());
  }

  public isPasswordValid() {
    this.showPasswordError = !this._validationProvider.validatePassword(this.password.trim());
  }

  public isUserRegistrationInputValid() {
    return this._validationProvider
      .isUserRegistrationInputValid(this.username.trim(), this.email.trim(), this.password.trim());
  }

  public goBack() {
    this.navCtrl.pop();
  }

}
