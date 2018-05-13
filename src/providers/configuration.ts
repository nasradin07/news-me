import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject'

import { InitialConfigurationProvider } from './initial-configuration';
import { StorageProvider } from './storage';

@Injectable()
export class ConfigurationProvider {
  allCategories: Array<{name: string, iconName: string}> = [
    { name: 'General News', iconName: 'general-news'},
    { name: 'Business News', iconName: 'business-news'},
    { name: 'Programming News', iconName: 'programming-news' },
    { name: 'Sport News', iconName: 'sport-news'},
    { name: 'Entertainment News', iconName: 'entertainment-news'},
    { name: 'Cryptocurrency News', iconName: 'cryptocurrency-news'},
    { name: 'Life Health Fitnes News', iconName: 'life-health-fitnes-news' },
    { name: 'Technology News', iconName: 'technology-news' }
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
    this.getReplacementsCategory();
    this.sendConfiguration(this.categories);
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
    console.log(this._initialConfigurationProvider.clientConfiguration);
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
    this._storageProvider.saveData(key,newsConfiguration);
  }

}
