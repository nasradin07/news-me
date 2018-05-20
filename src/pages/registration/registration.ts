import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

// PROVIDES
import { ValidationProvider } from '../../providers/validation';
import { RegisterProvider } from '../../providers/register';
import { ChangePageProvider } from '../../providers/change-page';
// PAGES
import { HomePage } from '../home/home';

@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
  providers: [ValidationProvider ,RegisterProvider]
})
export class RegistrationPage {
  _subscriptions: Subscription[] = [];
  username: string = '';
  email: string = '';
  password: string = '';
  yearOfBirth: string = '';
  showUsernameError = false;
  showEmailError = false;
  showPasswordError = false;
  showYearOfBirthError = false;
  registrationError: {show: boolean, message: string} = {show: false,message: ''};
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _validationProvider: ValidationProvider, 
    private _registerProvider: RegisterProvider,
    private _changePageProvider: ChangePageProvider,
    private _changeDetectorRef: ChangeDetectorRef
  ) {  }

  ionViewDidLoad() {
    this._subscribeToRegisterEvent();
  }

  private _subscribeToRegisterEvent() {
    this._subscriptions.push(
      this._registerProvider.sendMessage$.subscribe(
        registrationResponse => {
          if (registrationResponse['status'] === 'failed') {
            this.registrationError.show = true;
            this.registrationError.message = registrationResponse['message'];
            this._changeDetectorRef.detectChanges();
            console.log(registrationResponse);
          } else {
            this.goToHomePage();
            console.log('Going to home');
          }
        }
      )
    );
  }

  public goToHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

  public register() {
    if ( !this.isUserRegistrationInputValid() ) {
      console.log('input not valid');
      return;
    }
    const username = this.username.trim();
    const email = this.email.trim();
    const password = this.password.trim();
    const birthYear = parseInt(this.yearOfBirth.trim(), 10);
    this._registerProvider.register(username, email, password, birthYear);

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

  public isYearOfBirthValid() {
    this.showYearOfBirthError = !this._validationProvider.validateYearOfBirth(this.yearOfBirth.trim());
  }

  public isUserRegistrationInputValid() {
    return this._validationProvider
      .isUserRegistrationInputValid(this.username.trim(), this.email.trim(), this.password.trim(), this.yearOfBirth.trim());
  }

  public goBack() {
    this.navCtrl.pop();
  }

  public closeReplacementList() {
    this._changePageProvider.closeReplacementList();
  }

  ionViewDidLeave() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
