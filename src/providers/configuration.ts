import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject'

import { InitialConfigurationProvider } from './initial-configuration';
import { StorageProvider } from './storage';
import { UserProvider } from './user';

@Injectable()
export class ConfigurationProvider {
  allCategories: Array< string> = [
    'General News','Business News','Programming News','Sport News','Entertainment News',
    'Cryptocurrency News','Life Health Fitnes News','Technology News' 
  ];
  private _categoriesFetchEvent = new Subject();
  public  categoriesFetchEvent$ = this._categoriesFetchEvent.asObservable();

  private _categoriesForReplacementFetchEvent = new Subject();
  public categoriesForReplacementFetchEvent$ = this._categoriesForReplacementFetchEvent.asObservable();
  _categories;
  _replacementCategories;

  public categoryForReplacement;
  constructor(
    private _http: HttpClient,
    private _initialConfigurationProvider: InitialConfigurationProvider,
    private _storageProvider: StorageProvider,
    private _userProvider: UserProvider
  ) {
  }

  public getConfigurationOptions() {
    const url = 'http://api-news-me.ml/public/users/configuration';
    this._http.get(url).subscribe(
      response => console.log(response),
      err => console.log(err)
    )
  }

  public getClientConfiguration() {
    return this._initialConfigurationProvider.clientConfiguration;
  }

  public getAllCategories() {
    return this.allCategories;
  }

  public getNewsCategories() {
    return this._categories;
  }

  public getReplacementCategories() {
    return this._replacementCategories;
  }

  public replaceCategory(newCategory, oldCategory) {
    let indexOfOldCategory = this._categories.findIndex(category => category === oldCategory);
    this._categories.splice(indexOfOldCategory, 1, newCategory);
    this.initializeReplacementsCategory();
    this.notifyOfCategoriesFetchEvent();
    this.saveClientNewsConfiguration(this._categories);
  }

  public initializeReplacementsCategory() {
    this._replacementCategories =  this.allCategories.filter(category => {
      return !this._categories.find(categoryUsed => categoryUsed === category )
    });
    this.notifyReplacementsCategoryFetchEvent();
  }

  public notifyReplacementsCategoryFetchEvent() {
    this._categoriesForReplacementFetchEvent.next(true);
  }

  public getNumberOfNewsArticlesForLoad() {
    return this._initialConfigurationProvider.clientConfiguration['loadMoreBatch'];
  }

  public initializeClientNewsConfiguration() {
    let key = 'clientNewsCategories';
    this._storageProvider.getData(key).then(categories => {
      if (categories !== null) {
        this._categories = categories;
      } else {
        this._categories = this.allCategories.slice(0,5);
        this.saveClientNewsConfiguration(this.allCategories.slice(0,5));
      }
      this.notifyOfCategoriesFetchEvent();
    });
  }

  public notifyOfCategoriesFetchEvent() {
    this._categoriesFetchEvent.next(true)
  }

  public saveClientNewsConfiguration(newsConfiguration) {
    let key = 'clientNewsCategories';
    this._categories = newsConfiguration;
    this._storageProvider.saveData(key,newsConfiguration);
  }

  public sendUserConfigurationToServer(configuration) {
    if (this._userProvider.isUserLoggedIn() === true) {
      configuration['userEmail'] = this._userProvider.getUserEmail();
      this.updateUserConfguration(configuration);
    } 
  }

  public updateUserConfguration(configuration) {
    console.log('Called update confgih');
    const url = 'http://api-news-me.ml/public/users/configuration';
    this._http.post(url, configuration).subscribe(
      response => console.log(response),
      err => console.log(err)
    );
  }

  public saveCategoryForReplacement(categoryForReplacement) {
    this.categoryForReplacement = categoryForReplacement;
  }

  public setUserNewsCategories(categories) {
    let key = 'clientNewsCategories'
    this._storageProvider.saveData(key, categories)
      .then( (data) => this.initializeClientNewsConfiguration());

  }

}
