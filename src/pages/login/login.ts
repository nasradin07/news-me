import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

// PROVIDERS
import { LoginProvider } from '../../providers/login';
import { ValidationProvider } from '../../providers/validation';
import { StorageProvider  } from '../../providers/storage';
import { UserProvider } from '../../providers/user';
// PAGES
import { HomePage } from '../home/home';
import { RegistrationPage } from '../registration/registration'

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  isUserLoggedIn: boolean = false;
  error: {show: boolean, message: string} = { show: false, message: ''};
  email: string = '';
  password: string = '';
  showEmailError = false;
  showPasswordError = false;
  _subscriptions: Subscription[] = [];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _alertCtrl: AlertController,
    private _changeDetectRef: ChangeDetectorRef,
    private _loginProvider: LoginProvider,
    private _validationProvider: ValidationProvider,
    private _storageProvider: StorageProvider,
    private _userProvider: UserProvider
  ) { }

  ionViewDidLoad() {
    this.checkIfUserIsLoggedIn();
    this._subscribeToLoginEvent();
  }

  private _subscribeToLoginEvent() {
    this._subscriptions.push(
      this._loginProvider.sendMessage$.subscribe(
        loginActionResponse => {
          if (loginActionResponse['status'] === 'failed') {
            this.error = {
              show: true,
              message: loginActionResponse['message']
            }
            this._changeDetectRef.detectChanges();
          } else {
            this.askDoesUserWantToSavePassword();
            this.goToHome();
          }
        }
      )
    );
  }

  public signIn() {
    if (this.isUserLoginInputValid() === true) {
      this._loginProvider.login(this.email, this.password);
    } else {
      this.showEmailError = true;
      this.showPasswordError = true;
    }
  }

  public signOut() {
    console.log('Signing out');
  }

  public askDoesUserWantToSavePassword() {
    let alert = this._alertCtrl.create({
      title: 'Automatic login',
      message: 'Do you want to login automaticly with this account?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this._storageProvider.saveUserEmailAndPassword(this.email, this.password)
              .catch(err => console.log(err));
            return true; // automatic dissmis
          }
        }, 
        {
          text: 'No',
          handler: function() {
            return true; // automatic dissmis
          }
        }
      ]
    });
    alert.present();
  }

  public checkIfUserIsLoggedIn() {
    if (this._userProvider.isUserLoggedIn() === true) { 
      this.isUserLoggedIn = true;
    }
  }

  public goToRegistrationPage() {
    this.navCtrl.push(RegistrationPage);
  }

  public goToHome() {
    this.navCtrl.setRoot(HomePage);
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
    return this._validationProvider.isUserLoginInputValid(this.email.trim(), this.password.trim());
  }

  public isEmailValid() {
    this.showEmailError = !this._validationProvider.validateEmail(this.email.trim());
  }

  public isPasswordValid() {
    this.showPasswordError = !this._validationProvider.validatePassword(this.password.trim());
  }

  private _unsubscribeAll() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  ionViewDidLeave() {
    this._unsubscribeAll();
  }
//test
}
