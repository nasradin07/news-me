import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// PROVIDERS
import { LoginProvider } from '../../providers/login/login';
import { ValidationProvider } from '../../providers/validation/validation';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email: string = '';
  password: string = '';
  showEmailError = false;
  showPasswordError = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _loginProvider: LoginProvider,
    private _validationProvider: ValidationProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public signIn() {
    this._loginProvider.login(this.email, this.password);
  }

  public register() {
    if ( !this.isUserLoginInputValid() ) {
      console.log('Invalid input');
    }
    const email = this.email.trim();
    const password = this.password.trim();
    this._loginProvider.login(email, password);
  }

  public isUserLoginInputValid() {
    this._validationProvider.isUserLoginInputValid(this.email.trim(), this.password.trim());
  }

  public isEmailValid() {
    this.showEmailError = !this._validationProvider.validateEmail(this.email.trim());
    console.log(this.showEmailError);
  }

  public isPasswordValid() {
    this.showPasswordError = !this._validationProvider.validatePassword(this.password.trim());
  }

}
