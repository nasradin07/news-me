import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject'

import { InitialConfigurationProvider } from './initial-configuration';
import { StorageProvider } from './storage';

@Injectable()
export class ConfigurationProvider {
  allCategories: Array<{name: string, iconName: string}> = [
    { name: 'General News', iconName: 'albums'},
    { name: 'Business News', iconName: 'briefcase'},
    { name: 'Programming News', iconName: 'laptop' },
    { name: 'Sport News', iconName: 'football'},
    { name: 'Entertainment News', iconName: 'easel'},
    { name: 'Cryptocurrency News', iconName: 'cash'},
    { name: 'Lyfestyle News', iconName: 'heart' },
    { name: 'Technology News', iconName: 'phone-portrait' }
  ];
  private _categoriesFetchEvent = new Subject();
  public  categoriesFetchEvent$ = this._categoriesFetchEvent.asObservable();

  private _categoriesForReplacementFetchEvent = new Subject();
  public categoriesForReplacementFetchEvent$ = this._categoriesForReplacementFetchEvent.asObservable();
  categories;
  categoryForReplacement;
  constructor(
    private _http: HttpClient,
    private _initialConfigurationProvider: InitialConfigurationProvider,
    private _storageProvider: StorageProvider
  ) {
    console.log('Hello ConfigurationProvider Provider');
  }

  public getConfigurationOptions() {
    const url = 'http://api-news-me.ml/public/configurations-with-options';
    this._http.get(url).subscribe(
      response => console.log(response),
      err => console.log(err)
    )
  }

  public getClientConfiguration() {
    return this._initialConfigurationProvider.clientConfiguration;
  }

  public replaceCategory(newCategory, oldCategory) {
    let indexOfOldCategory = this.categories.findIndex(category => category.name === oldCategory.name);
    this.categories.splice(indexOfOldCategory, 1, newCategory);
    this.saveClientNewsConfiguration(this.categories);
  }

  public saveCategoryForReplacement(category) {
    this.categoryForReplacement = category;
  }

  public getReplacementsCategory() {
    const replacementCategories =  this.allCategories.filter(category => {
      return !this.categories.find(categoryUsed => categoryUsed.name === category.name )
    });
    this.sendReplacementsCategory(replacementCategories);
  }

  public sendReplacementsCategory(replacementCategories) {
    this._categoriesForReplacementFetchEvent.next(replacementCategories);
  }

  public getNumberOfNewsArticlesForLoad() {
    return this._initialConfigurationProvider.clientConfiguration['loadMoreBatch'];
  }

  public getClientNewsConfiguration() {
    let key = 'clientNewsCategories';
    this._storageProvider.getData(key).then(categories => {
      if (categories !== null) {
        this.categories = categories;
        this.sendConfiguration(categories);
      } else {
         this.sendConfiguration(this.allCategories.slice(0,5));
         this.saveClientNewsConfiguration(this.allCategories.slice(0,5));
      }
    });
  }

  public sendConfiguration(categories) {
    this._categoriesFetchEvent.next(categories)
  }

  public saveClientNewsConfiguration(newsConfiguration) {
    let key = 'clientNewsCategories';
    this.categories = newsConfiguration;
    return this._storageProvider.saveData(key,newsConfiguration);
  }

}
